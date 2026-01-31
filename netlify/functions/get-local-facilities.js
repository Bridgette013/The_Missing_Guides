// netlify/functions/get-local-facilities.js
// Fetches nearby hospitals and detox facilities based on ZIP code

const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

// Convert ZIP code to lat/lng using Google Geocoding API
async function zipToCoordinates(zip) {
  const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&key=${GOOGLE_API_KEY}`;

  const response = await fetch(geocodeUrl);
  const data = await response.json();

  if (data.status !== 'OK' || !data.results.length) {
    throw new Error(`Could not geocode ZIP code: ${zip}`);
  }

  const location = data.results[0].geometry.location;
  return {
    lat: location.lat,
    lng: location.lng,
    formattedAddress: data.results[0].formatted_address
  };
}

// Search for places using Google Places API (New)
async function searchPlaces(lat, lng, query, maxResults = 3) {
  const searchUrl = 'https://places.googleapis.com/v1/places:searchText';

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
    maxResultCount: maxResults,
    languageCode: "en"
  };

  const response = await fetch(searchUrl, {
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
}

exports.handler = async (event) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { zip } = JSON.parse(event.body);

    if (!zip) {
      return {
        statusCode: 400,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'ZIP code is required' })
      };
    }

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
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: true,
        location: coords.formattedAddress,
        hospitals,
        detoxFacilities
      })
    };

  } catch (error) {
    console.error('Error fetching facilities:', error);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({
        error: 'Failed to fetch facilities',
        details: error.message
      })
    };
  }
};
