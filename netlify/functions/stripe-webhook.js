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
const { fetchFacilitiesData } = require('./get-local-facilities');

// Lazy-loaded to avoid cold start penalty when not needed
let chromium, puppeteer;

async function loadBrowserDeps() {
  if (!chromium) {
    chromium = require('@sparticuz/chromium');
    puppeteer = require('puppeteer-core');
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
      const apiKey = process.env.GOOGLE_PLACES_API_KEY;
      facilitiesData = await fetchFacilitiesData(parsedData.zip, apiKey);
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
