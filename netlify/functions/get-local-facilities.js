// netlify/functions/get-local-facilities.js
// Fetches nearby hospitals and detox facilities based on ZIP code
// Security: Input validation, rate limiting, CORS restrictions, error handling

const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || 'http://localhost:3000,http://localhost:8888').split(',');
const RATE_LIMIT_WINDOW = 60000; // 1 minute in milliseconds
const RATE_LIMIT_MAX_REQUESTS = 20; // Max requests per IP per window
const REQUEST_TIMEOUT = 10000; // 10 second timeout

// Simple in-memory rate limiting (for production, use Redis)
const requestCounts = new Map();

// Validate environment setup
function validateConfig() {
  if (!GOOGLE_API_KEY) {
    throw new Error('API key not configured');
  }
}

// Validate ZIP code format (5 digits or 5+4)
function validateZipCode(zip) {
  if (!zip || typeof zip !== 'string') {
    throw new Error('Invalid ZIP code format');
  }
  if (!/^\d{5}(-\d{4})?$/.test(zip.trim())) {
    throw new Error('Invalid ZIP code format');
  }
  return zip.trim();
}

// Rate limiting by IP address
function checkRateLimit(clientIp) {
  const now = Date.now();
  const key = clientIp;

  if (!requestCounts.has(key)) {
    requestCounts.set(key, []);
  }

  const timestamps = requestCounts.get(key);
  const recentRequests = timestamps.filter(ts => now - ts < RATE_LIMIT_WINDOW);

  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    throw new Error('Rate limit exceeded');
  }

  recentRequests.push(now);
  requestCounts.set(key, recentRequests);

  // Cleanup old entries to prevent memory leak
  if (requestCounts.size > 10000) {
    for (const [ip, times] of requestCounts.entries()) {
      const recent = times.filter(ts => now - ts < RATE_LIMIT_WINDOW);
      if (recent.length === 0) {
        requestCounts.delete(ip);
      }
    }
  }
}

// Verify CORS origin
function verifyCorsOrigin(origin) {
  if (!origin) return false;
  return ALLOWED_ORIGINS.some(allowed => origin.includes(allowed.trim()));
}

// Get client IP from headers
function getClientIp(event) {
  return (
    event.headers['x-forwarded-for']?.split(',')[0] ||
    event.headers['client-ip'] ||
    event.requestContext?.identity?.sourceIp ||
    'unknown'
  );
}

// Wrapper for fetch with timeout
async function fetchWithTimeout(url, options = {}, timeout = REQUEST_TIMEOUT) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

// Convert ZIP code to lat/lng using Google Geocoding API
async function zipToCoordinates(zip) {
  const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&key=${GOOGLE_API_KEY}`;

  try {
    const response = await fetchWithTimeout(geocodeUrl);
    const data = await response.json();

    if (data.status !== 'OK' || !data.results.length) {
      throw new Error('Location not found');
    }

    const location = data.results[0].geometry.location;
    return {
      lat: location.lat,
      lng: location.lng,
      formattedAddress: data.results[0].formatted_address
    };
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw error;
  }
}

// Search for places using Google Places API (New)
async function searchPlaces(lat, lng, query, maxResults = 3) {
  const searchUrl = 'https://places.googleapis.com/v1/places:searchText';

  // Validate input parameters
  if (typeof lat !== 'number' || typeof lng !== 'number' || maxResults > 5) {
    throw new Error('Invalid search parameters');
  }

  const requestBody = {
    textQuery: query,
    locationBias: {
      circle: {
        center: {
          latitude: lat,
          longitude: lng
        },
        radius: 40233.6 // 25 miles in meters
      }
    },
    maxResultCount: Math.min(maxResults, 5), // Cap at 5 results
    languageCode: "en"
  };

  try {
    const response = await fetchWithTimeout(searchUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': GOOGLE_API_KEY,
        'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.websiteUri'
      },
      body: JSON.stringify(requestBody)
    });

    const data = await response.json();

    if (!data.places) {
      return [];
    }

    return data.places.map(place => ({
      name: place.displayName?.text || 'Unknown',
      address: place.formattedAddress || 'Address not available',
      phone: place.nationalPhoneNumber || 'Phone not available',
      website: place.websiteUri || null
    }));
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw error;
  }
}

exports.handler = async (event) => {
  // Get request origin and client IP
  const origin = event.headers.origin || event.headers.referer?.split('/')[2];
  const clientIp = getClientIp(event);

  // Build CORS headers based on origin verification
  const isValidOrigin = verifyCorsOrigin(origin);
  const corsHeaders = {
    'Access-Control-Allow-Origin': isValidOrigin ? origin : '',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Max-Age': '3600'
  };

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: isValidOrigin ? 200 : 403,
      headers: corsHeaders,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // Validate CORS origin
  if (!isValidOrigin) {
    console.warn(`Rejected request from unauthorized origin: ${origin} by IP: ${clientIp}`);
    return {
      statusCode: 403,
      headers: { 'Access-Control-Allow-Origin': '' },
      body: JSON.stringify({ error: 'Forbidden' })
    };
  }

  try {
    // Validate configuration
    validateConfig();

    // Check rate limit
    checkRateLimit(clientIp);

    // Validate request body
    if (!event.body) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Bad request' })
      };
    }

    let requestData;
    try {
      requestData = JSON.parse(event.body);
    } catch {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Bad request' })
      };
    }

    // Validate and sanitize ZIP code
    const zip = validateZipCode(requestData.zip);

    // Get coordinates from ZIP
    const coords = await zipToCoordinates(zip);

    // Search for emergency rooms and detox facilities in parallel
    const [hospitals, detoxFacilities] = await Promise.all([
      searchPlaces(coords.lat, coords.lng, 'emergency room hospital', 3),
      searchPlaces(coords.lat, coords.lng, 'detox center addiction treatment facility', 3)
    ]);

    return {
      statusCode: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
      },
      body: JSON.stringify({
        success: true,
        location: coords.formattedAddress,
        hospitals,
        detoxFacilities
      })
    };

  } catch (error) {
    // Log error without exposing details
    console.error(`Error processing request from IP ${clientIp}:`, error.message);

    // Determine error response
    let statusCode = 500;
    let errorMessage = 'Service temporarily unavailable';

    if (error.message === 'Rate limit exceeded') {
      statusCode = 429;
      errorMessage = 'Too many requests';
    } else if (error.message === 'Invalid ZIP code format') {
      statusCode = 400;
      errorMessage = 'Invalid ZIP code format';
    } else if (error.message === 'Location not found') {
      statusCode = 404;
      errorMessage = 'Location not found';
    } else if (error.message === 'Request timeout') {
      statusCode = 504;
      errorMessage = 'Request timeout';
    } else if (error.message === 'API key not configured') {
      statusCode = 500;
      errorMessage = 'Service configuration error';
    }

    return {
      statusCode,
      headers: corsHeaders,
      body: JSON.stringify({ error: errorMessage })
    };
  }
};
