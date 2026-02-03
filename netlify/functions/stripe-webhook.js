// netlify/functions/stripe-webhook.js
// Orchestrates the full fulfillment pipeline:
// 1. Receive Stripe "checkout.session.completed" webhook
// 2. Extract customer + personalization data from session metadata
// 3. Fetch local facilities (hospitals, detox, IOP) via get-local-facilities
// 4. Generate personalized HTML guide(s) via generate-guide
// 5. Convert HTML to PDF via puppeteer-core + @sparticuz/chromium
// 6. Send PDF to customer via send-guide-email (SendGrid)

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Direct imports — no HTTP round-trips within the same function runtime
const { generateGuideHTML, GUIDE_NAMES } = require('./generate-guide');
const { sendGuideEmail, sendFailureAlert } = require('./send-guide-email');

// Lazy-loaded to avoid cold start penalty when not needed
let chromium, puppeteer;

async function loadBrowserDeps() {
  if (!chromium) {
    chromium = require('@sparticuz/chromium');
    puppeteer = require('puppeteer-core');
  }
}

// Fetch facilities data for a ZIP code (direct function call, not HTTP)
async function fetchFacilitiesData(zip) {
  if (!zip) return null;

  const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
  if (!GOOGLE_API_KEY) {
    console.warn('GOOGLE_PLACES_API_KEY not set, skipping facility lookup');
    return null;
  }

  try {
    // Geocode ZIP to coordinates
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&key=${GOOGLE_API_KEY}`;
    const geoResponse = await fetch(geocodeUrl);
    const geoData = await geoResponse.json();

    if (geoData.status !== 'OK' || !geoData.results.length) {
      console.warn(`Could not geocode ZIP: ${zip}`);
      return null;
    }

    const { lat, lng } = geoData.results[0].geometry.location;

    // Derive state from ZIP prefix
    const { getStateFromZip } = require('./get-local-facilities');
    const stateName = typeof getStateFromZip === 'function'
      ? getStateFromZip(zip)
      : null;

    // Search for facilities in parallel
    const searchPlaces = async (query, maxResults) => {
      const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': GOOGLE_API_KEY,
          'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.websiteUri',
        },
        body: JSON.stringify({
          textQuery: query,
          locationBias: {
            circle: {
              center: { latitude: lat, longitude: lng },
              radius: 40233.6,
            },
          },
          maxResultCount: maxResults,
          languageCode: 'en',
        }),
      });

      const data = await response.json();
      if (!data.places) return [];

      return data.places.map((place) => ({
        name: place.displayName?.text || 'Unknown',
        address: place.formattedAddress || 'Address not available',
        phone: place.nationalPhoneNumber || 'Phone not available',
        website: place.websiteUri || null,
      }));
    };

    const [hospitals, inpatientFacilities, iopFacilities] = await Promise.all([
      searchPlaces('emergency room hospital', 3),
      searchPlaces('detox center addiction treatment inpatient facility', 2),
      searchPlaces('intensive outpatient program IOP substance abuse treatment', 2),
    ]);

    return {
      success: true,
      stateName,
      hospitals,
      inpatientFacilities,
      iopFacilities,
      detoxFacilities: inpatientFacilities,
    };
  } catch (error) {
    console.error('Facility lookup error:', error.message);
    return null;
  }
}

// Convert HTML string to PDF buffer using headless Chromium
async function htmlToPdf(html) {
  await loadBrowserDeps();

  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  });

  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0', timeout: 15000 });

    const pdfBuffer = await page.pdf({
      format: 'Letter',
      printBackground: true,
      margin: { top: '0.75in', right: '0.75in', bottom: '1in', left: '0.75in' },
    });

    return Buffer.from(pdfBuffer);
  } finally {
    await browser.close();
  }
}

// Log failed order data so it can be recovered
function logFailedOrder(sessionId, customerEmail, customerName, guideIds, error) {
  const failedOrder = {
    timestamp: new Date().toISOString(),
    sessionId,
    customerEmail,
    customerName,
    guideIds,
    error: error.message || String(error),
    stack: error.stack,
  };

  // Log as structured JSON for Netlify log search
  console.error('FAILED_ORDER:', JSON.stringify(failedOrder));

  return failedOrder;
}

exports.handler = async (event) => {
  // Only accept POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const sig = event.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let stripeEvent;

  // Step 1: Verify webhook signature
  try {
    stripeEvent = stripe.webhooks.constructEvent(event.body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid signature' }) };
  }

  // Only process checkout completions
  if (stripeEvent.type !== 'checkout.session.completed') {
    return { statusCode: 200, body: JSON.stringify({ received: true, type: stripeEvent.type }) };
  }

  const session = stripeEvent.data.object;
  const sessionId = session.id;
  const customerEmail = session.customer_email || session.customer_details?.email;

  let parsedData = {};
  let guideIds = [];
  let customerName = '';

  try {
    // Step 2: Extract customer data from metadata
    const { guideId, personalizationData } = session.metadata || {};

    if (!personalizationData) {
      throw new Error('No personalization data in session metadata');
    }

    parsedData = JSON.parse(personalizationData);
    customerName = parsedData.caregiverName || '';

    // Determine which guides to generate
    guideIds = guideId === 'bundle'
      ? ['alcohol', 'opioid', 'stimulant', 'benzo', 'general']
      : [guideId];

    console.log(`Processing order ${sessionId}: ${guideIds.join(', ')} for ${customerEmail}`);

    // Step 3: Fetch local facilities data
    let facilitiesData = null;
    if (parsedData.zip) {
      console.log(`Looking up facilities for ZIP: ${parsedData.zip}`);
      facilitiesData = await fetchFacilitiesData(parsedData.zip);
      if (!facilitiesData) {
        console.warn('Facility lookup returned no data - using SAMHSA fallback');
      }
    }

    // Step 4: Generate personalized HTML for each guide
    const pdfBuffers = [];

    for (const gId of guideIds) {
      console.log(`Generating guide: ${gId}`);

      const guideData = { ...parsedData, guideId: gId };
      const html = await generateGuideHTML(guideData, facilitiesData);

      // Step 5: Convert HTML to PDF
      console.log(`Converting ${gId} to PDF`);
      const pdfBuffer = await htmlToPdf(html);
      pdfBuffers.push(pdfBuffer);

      console.log(`PDF generated for ${gId}: ${(pdfBuffer.length / 1024).toFixed(0)} KB`);
    }

    // Step 6: Send email with PDF attachment(s)
    console.log(`Sending email to ${customerEmail}`);
    await sendGuideEmail({
      customerEmail,
      customerName,
      guideIds,
      pdfBuffers,
    });

    console.log(`Order ${sessionId} fulfilled successfully`);

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true, fulfilled: true }),
    };

  } catch (error) {
    console.error(`Fulfillment error for session ${sessionId}:`, error);

    // Log the failed order data for recovery
    logFailedOrder(sessionId, customerEmail, customerName, guideIds, error);

    // Send failure alert to admin
    try {
      await sendFailureAlert({
        customerEmail: customerEmail || 'unknown',
        customerName: customerName || 'unknown',
        guideIds,
        error: error.message,
        sessionId,
      });
    } catch (alertError) {
      console.error('Failed to send admin alert:', alertError.message);
    }

    // Return 200 to Stripe so it doesn't retry (we'll handle manually)
    // Returning 500 would cause Stripe to retry, which may cause duplicate emails
    // if the error is intermittent. Better to handle failures via admin alerts.
    return {
      statusCode: 200,
      body: JSON.stringify({
        received: true,
        fulfilled: false,
        error: error.message,
      }),
    };
  }
};
