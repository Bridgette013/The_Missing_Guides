// netlify/functions/generate-guide.js
// Generates a personalized recovery guide HTML from templates.
// Replaces all [SQUARE_BRACKET] placeholders with customer data.

const fs = require('fs').promises;
const path = require('path');

const FALLBACK_FACILITY_TEXT = 'Contact SAMHSA National Helpline: 1-800-662-4357 for local resources';

// Guide ID to human-readable name mapping
const GUIDE_NAMES = {
  alcohol: 'Alcohol Recovery Guide',
  opioid: 'Opioid Recovery Guide',
  benzo: 'Benzodiazepine Recovery Guide',
  benzodiazepine: 'Benzodiazepine Recovery Guide',
  stimulant: 'Stimulant Recovery Guide',
  general: 'General Substance Recovery Guide',
};

// Pronoun mapping based on selected pronouns
function getPronounMap(pronouns) {
  const p = (pronouns || 'they/them').toLowerCase().trim();

  if (p === 'he/him' || p === 'he' || p === 'him') {
    return {
      him_her: 'him',
      he_she: 'he',
      his_her: 'his',
      HE_SHE: 'He',
      HIM_HER: 'Him',
      HIS_HER: 'His',
    };
  }

  if (p === 'she/her' || p === 'she' || p === 'her') {
    return {
      him_her: 'her',
      he_she: 'she',
      his_her: 'her',
      HE_SHE: 'She',
      HIM_HER: 'Her',
      HIS_HER: 'Her',
    };
  }

  // Default: they/them
  return {
    him_her: 'them',
    he_she: 'they',
    his_her: 'their',
    HE_SHE: 'They',
    HIM_HER: 'Them',
    HIS_HER: 'Their',
  };
}

// Derive state name from ZIP code using first 3 digits
function getStateFromZip(zip) {
  if (!zip) return null;
  // Use the same lookup from get-local-facilities or a simplified version
  // The full map is in get-local-facilities.js; here we use a simplified approach
  // that covers the most common cases via Google Geocoding address parsing
  return null; // Will be provided by facility data
}

// Build the complete set of placeholder replacements
function buildReplacements(data, facilitiesData) {
  const replacements = {};

  // --- Personal data ---
  replacements['[PATIENT_NAME]'] = data.patientName || '[Patient Name]';
  replacements['[YOUR_NAME]'] = data.caregiverName || '[Your Name]';
  replacements['[RELATIONSHIP]'] = data.relationship || '[Relationship]';
  replacements['[EMERGENCY_CONTACT]'] = data.emergencyContact || '[Emergency Contact]';

  // --- Pronoun placeholders ---
  const pronouns = getPronounMap(data.pronouns);
  replacements['[him_her]'] = pronouns.him_her;
  replacements['[he_she]'] = pronouns.he_she;
  replacements['[his_her]'] = pronouns.his_her;
  replacements['[HE_SHE]'] = pronouns.HE_SHE;
  replacements['[HIM_HER]'] = pronouns.HIM_HER;
  replacements['[HIS_HER]'] = pronouns.HIS_HER;

  // --- State placeholders ---
  const stateName = facilitiesData?.stateName || 'Your State';
  replacements['[STATE_NAME]'] = stateName;
  replacements['[STATE_CRISIS_LINE_PHONE]'] = '988'; // National default (988 Suicide & Crisis Lifeline)

  // --- Hospital placeholders ---
  const hospitals = facilitiesData?.hospitals || [];

  // PRIMARY_HOSPITAL (hospitals[0])
  replacements['[PRIMARY_HOSPITAL_NAME]'] = hospitals[0]?.name || FALLBACK_FACILITY_TEXT;
  replacements['[PRIMARY_HOSPITAL_ADDRESS]'] = hospitals[0]?.address || 'See SAMHSA.gov';
  replacements['[PRIMARY_HOSPITAL_PHONE]'] = hospitals[0]?.phone || '1-800-662-4357';
  replacements['[PRIMARY_HOSPITAL_WEBSITE]'] = hospitals[0]?.website || '';

  // BACKUP_HOSPITAL_1 (hospitals[1])
  replacements['[BACKUP_HOSPITAL_1_NAME]'] = hospitals[1]?.name || FALLBACK_FACILITY_TEXT;
  replacements['[BACKUP_HOSPITAL_1_ADDRESS]'] = hospitals[1]?.address || 'See SAMHSA.gov';
  replacements['[BACKUP_HOSPITAL_1_PHONE]'] = hospitals[1]?.phone || '1-800-662-4357';
  replacements['[BACKUP_HOSPITAL_1_WEBSITE]'] = hospitals[1]?.website || '';
  replacements['[BACKUP_HOSPITAL_1_CRISIS]'] = hospitals[1]?.phone || '988';

  // BACKUP_HOSPITAL_2 (hospitals[2])
  replacements['[BACKUP_HOSPITAL_2_NAME]'] = hospitals[2]?.name || FALLBACK_FACILITY_TEXT;
  replacements['[BACKUP_HOSPITAL_2_ADDRESS]'] = hospitals[2]?.address || 'See SAMHSA.gov';
  replacements['[BACKUP_HOSPITAL_2_PHONE]'] = hospitals[2]?.phone || '1-800-662-4357';
  replacements['[BACKUP_HOSPITAL_2_WEBSITE]'] = hospitals[2]?.website || '';

  // --- Inpatient facility placeholders ---
  const inpatient = facilitiesData?.inpatientFacilities || facilitiesData?.detoxFacilities || [];

  replacements['[INPATIENT_FACILITY_1_NAME]'] = inpatient[0]?.name || FALLBACK_FACILITY_TEXT;
  replacements['[INPATIENT_FACILITY_1_ADDRESS]'] = inpatient[0]?.address || 'See SAMHSA.gov';
  replacements['[INPATIENT_FACILITY_1_PHONE]'] = inpatient[0]?.phone || '1-800-662-4357';
  replacements['[INPATIENT_FACILITY_1_WEBSITE]'] = inpatient[0]?.website || '';

  replacements['[INPATIENT_FACILITY_2_NAME]'] = inpatient[1]?.name || FALLBACK_FACILITY_TEXT;
  replacements['[INPATIENT_FACILITY_2_ADDRESS]'] = inpatient[1]?.address || 'See SAMHSA.gov';
  replacements['[INPATIENT_FACILITY_2_PHONE]'] = inpatient[1]?.phone || '1-800-662-4357';
  replacements['[INPATIENT_FACILITY_2_WEBSITE]'] = inpatient[1]?.website || '';

  replacements['[INPATIENT_FACILITY_3_NAME]'] = inpatient[2]?.name || FALLBACK_FACILITY_TEXT;
  replacements['[INPATIENT_FACILITY_3_ADDRESS]'] = inpatient[2]?.address || 'See SAMHSA.gov';
  replacements['[INPATIENT_FACILITY_3_PHONE]'] = inpatient[2]?.phone || '1-800-662-4357';
  replacements['[INPATIENT_FACILITY_3_WEBSITE]'] = inpatient[2]?.website || '';

  // --- IOP facility placeholders ---
  const iop = facilitiesData?.iopFacilities || [];

  replacements['[IOP_FACILITY_1_NAME]'] = iop[0]?.name || FALLBACK_FACILITY_TEXT;
  replacements['[IOP_FACILITY_1_ADDRESS]'] = iop[0]?.address || 'See SAMHSA.gov';
  replacements['[IOP_FACILITY_1_PHONE]'] = iop[0]?.phone || '1-800-662-4357';

  replacements['[IOP_FACILITY_2_NAME]'] = iop[1]?.name || FALLBACK_FACILITY_TEXT;
  replacements['[IOP_FACILITY_2_ADDRESS]'] = iop[1]?.address || 'See SAMHSA.gov';
  replacements['[IOP_FACILITY_2_PHONE]'] = iop[1]?.phone || '1-800-662-4357';

  return replacements;
}

// Apply all replacements to the HTML string
function applyReplacements(html, replacements) {
  let result = html;
  for (const [placeholder, value] of Object.entries(replacements)) {
    // Escape the brackets for regex use
    const escaped = placeholder.replace(/[[\]]/g, '\\$&');
    result = result.replace(new RegExp(escaped, 'g'), value);
  }
  return result;
}

// Fetch local facilities directly (for internal calls from stripe-webhook)
async function fetchFacilities(zip) {
  try {
    const baseUrl = process.env.URL || process.env.SITE_URL || 'http://localhost:8888';
    const response = await fetch(`${baseUrl}/.netlify/functions/get-local-facilities`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ zip }),
    });

    if (!response.ok) {
      console.warn(`Facility lookup returned status ${response.status}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.warn('Error fetching facilities:', error.message);
    return null;
  }
}

// Main handler — can be called via HTTP or imported directly
exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const body = JSON.parse(event.body);
    const html = await generateGuideHTML(body, body.facilitiesData || null);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, html }),
    };
  } catch (error) {
    console.error('Error generating guide:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to generate guide', details: error.message }),
    };
  }
};

// Exported for direct use by stripe-webhook.js (no HTTP round-trip)
exports.generateGuideHTML = generateGuideHTML;
exports.GUIDE_NAMES = GUIDE_NAMES;

async function generateGuideHTML(data, facilitiesData) {
  const {
    guideId,
    caregiverName,
    patientName,
    pronouns,
    relationship,
    emergencyContact,
    zip,
  } = data;

  // Normalize guide ID for template filename
  const GUIDE_ID_MAP = {
    'BENZO': 'BENZODIAZEPINE',
    'GENERAL': 'GENERAL_SUBSTANCE',
  };
  let templateGuideId = guideId.toUpperCase();
  if (GUIDE_ID_MAP[templateGuideId]) templateGuideId = GUIDE_ID_MAP[templateGuideId];

  // Load template
  const templatePath = path.join(
    process.cwd(),
    'public',
    'templates',
    `TMG_${templateGuideId}_RECOVERY_GUIDE_TEMPLATE.html`
  );
  let guideHTML = await fs.readFile(templatePath, 'utf-8');

  // Fetch facilities if not already provided and ZIP is available
  if (!facilitiesData && zip) {
    facilitiesData = await fetchFacilities(zip);
  }

  // Build and apply replacements
  const replacements = buildReplacements(data, facilitiesData);
  guideHTML = applyReplacements(guideHTML, replacements);

  // Remove the template instruction box (yellow box at top)
  guideHTML = guideHTML.replace(
    /<!-- TEMPLATE INSTRUCTIONS.*?<\/div>\s*<div class="page-break"><\/div>/s,
    ''
  );

  return guideHTML;
}
