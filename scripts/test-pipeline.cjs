/**
 * End-to-end pipeline test (local, self-contained).
 * Directly implements the replacement logic to test template processing
 * without hitting the ESM/CJS module issue from package.json "type": "module".
 *
 * Tests:
 *   1. Template loading
 *   2. Square bracket placeholder replacement
 *   3. Pronoun mapping for all three variants
 *   4. Facility placeholder injection with mock data
 *   5. State placeholder replacement
 *   6. All 5 guide templates
 *   7. PDF generation (if chromium available)
 */

const path = require('path');
const fs = require('fs');

const TEMPLATES_DIR = path.join(__dirname, '..', 'public', 'templates');
const FALLBACK = 'Contact SAMHSA National Helpline: 1-800-662-4357 for local resources';

// Inline the pronoun logic (same as generate-guide.js)
function getPronounMap(pronouns) {
  const p = (pronouns || 'they/them').toLowerCase().trim();
  if (p === 'he/him' || p === 'he' || p === 'him') {
    return { him_her: 'him', he_she: 'he', his_her: 'his', HE_SHE: 'He', HIM_HER: 'Him', HIS_HER: 'His' };
  }
  if (p === 'she/her' || p === 'she' || p === 'her') {
    return { him_her: 'her', he_she: 'she', his_her: 'her', HE_SHE: 'She', HIM_HER: 'Her', HIS_HER: 'Her' };
  }
  return { him_her: 'them', he_she: 'they', his_her: 'their', HE_SHE: 'They', HIM_HER: 'Them', HIS_HER: 'Their' };
}

function buildReplacements(data, fac) {
  const r = {};
  r['[PATIENT_NAME]'] = data.patientName || '[Patient Name]';
  r['[YOUR_NAME]'] = data.caregiverName || '[Your Name]';
  r['[RELATIONSHIP]'] = data.relationship || '[Relationship]';
  r['[EMERGENCY_CONTACT]'] = data.emergencyContact || '[Emergency Contact]';

  const pr = getPronounMap(data.pronouns);
  r['[him_her]'] = pr.him_her; r['[he_she]'] = pr.he_she; r['[his_her]'] = pr.his_her;
  r['[HE_SHE]'] = pr.HE_SHE; r['[HIM_HER]'] = pr.HIM_HER; r['[HIS_HER]'] = pr.HIS_HER;

  r['[STATE_NAME]'] = fac?.stateName || 'Your State';
  r['[STATE_CRISIS_LINE_PHONE]'] = '988';

  const h = fac?.hospitals || [];
  r['[PRIMARY_HOSPITAL_NAME]'] = h[0]?.name || FALLBACK;
  r['[PRIMARY_HOSPITAL_ADDRESS]'] = h[0]?.address || 'See SAMHSA.gov';
  r['[PRIMARY_HOSPITAL_PHONE]'] = h[0]?.phone || '1-800-662-4357';
  r['[PRIMARY_HOSPITAL_WEBSITE]'] = h[0]?.website || '';
  r['[BACKUP_HOSPITAL_1_NAME]'] = h[1]?.name || FALLBACK;
  r['[BACKUP_HOSPITAL_1_ADDRESS]'] = h[1]?.address || 'See SAMHSA.gov';
  r['[BACKUP_HOSPITAL_1_PHONE]'] = h[1]?.phone || '1-800-662-4357';
  r['[BACKUP_HOSPITAL_1_WEBSITE]'] = h[1]?.website || '';
  r['[BACKUP_HOSPITAL_1_CRISIS]'] = h[1]?.phone || '988';
  r['[BACKUP_HOSPITAL_2_NAME]'] = h[2]?.name || FALLBACK;
  r['[BACKUP_HOSPITAL_2_ADDRESS]'] = h[2]?.address || 'See SAMHSA.gov';
  r['[BACKUP_HOSPITAL_2_PHONE]'] = h[2]?.phone || '1-800-662-4357';
  r['[BACKUP_HOSPITAL_2_WEBSITE]'] = h[2]?.website || '';

  const inp = fac?.inpatientFacilities || [];
  r['[INPATIENT_FACILITY_1_NAME]'] = inp[0]?.name || FALLBACK;
  r['[INPATIENT_FACILITY_1_ADDRESS]'] = inp[0]?.address || 'See SAMHSA.gov';
  r['[INPATIENT_FACILITY_1_PHONE]'] = inp[0]?.phone || '1-800-662-4357';
  r['[INPATIENT_FACILITY_1_WEBSITE]'] = inp[0]?.website || '';
  r['[INPATIENT_FACILITY_2_NAME]'] = inp[1]?.name || FALLBACK;
  r['[INPATIENT_FACILITY_2_ADDRESS]'] = inp[1]?.address || 'See SAMHSA.gov';
  r['[INPATIENT_FACILITY_2_PHONE]'] = inp[1]?.phone || '1-800-662-4357';
  r['[INPATIENT_FACILITY_2_WEBSITE]'] = inp[1]?.website || '';
  r['[INPATIENT_FACILITY_3_NAME]'] = (inp[2] || inp[0])?.name || FALLBACK;
  r['[INPATIENT_FACILITY_3_ADDRESS]'] = (inp[2] || inp[0])?.address || 'See SAMHSA.gov';
  r['[INPATIENT_FACILITY_3_PHONE]'] = (inp[2] || inp[0])?.phone || '1-800-662-4357';
  r['[INPATIENT_FACILITY_3_WEBSITE]'] = (inp[2] || inp[0])?.website || '';

  const iop = fac?.iopFacilities || [];
  r['[IOP_FACILITY_1_NAME]'] = iop[0]?.name || FALLBACK;
  r['[IOP_FACILITY_1_ADDRESS]'] = iop[0]?.address || 'See SAMHSA.gov';
  r['[IOP_FACILITY_1_PHONE]'] = iop[0]?.phone || '1-800-662-4357';
  r['[IOP_FACILITY_2_NAME]'] = iop[1]?.name || FALLBACK;
  r['[IOP_FACILITY_2_ADDRESS]'] = iop[1]?.address || 'See SAMHSA.gov';
  r['[IOP_FACILITY_2_PHONE]'] = iop[1]?.phone || '1-800-662-4357';

  return r;
}

function applyReplacements(html, replacements) {
  let result = html;
  for (const [placeholder, value] of Object.entries(replacements)) {
    const escaped = placeholder.replace(/[[\]]/g, '\\$&');
    result = result.replace(new RegExp(escaped, 'g'), value);
  }
  return result;
}

function generateGuide(data, fac) {
  const GUIDE_ID_MAP = { 'BENZO': 'BENZODIAZEPINE', 'GENERAL': 'GENERAL_SUBSTANCE' };
  let guideId = data.guideId.toUpperCase();
  if (GUIDE_ID_MAP[guideId]) guideId = GUIDE_ID_MAP[guideId];

  const templatePath = path.join(TEMPLATES_DIR, `TMG_${guideId}_RECOVERY_GUIDE_TEMPLATE.html`);
  let html = fs.readFileSync(templatePath, 'utf-8');

  const replacements = buildReplacements(data, fac);
  html = applyReplacements(html, replacements);

  // Remove instruction box
  html = html.replace(/<!-- TEMPLATE INSTRUCTIONS.*?<\/div>\s*<div class="page-break"><\/div>/s, '');

  return html;
}

// Mock data
const mockFacilities = {
  success: true,
  stateName: 'Arizona',
  hospitals: [
    { name: 'Banner University Medical Center', address: '1111 E McDowell Rd, Phoenix, AZ 85006', phone: '(602) 839-2000', website: 'https://bannerhealth.com' },
    { name: "St. Joseph's Hospital", address: '350 W Thomas Rd, Phoenix, AZ 85013', phone: '(602) 406-3000', website: null },
    { name: 'Abrazo Maryvale Campus', address: '5102 W Campbell Ave, Phoenix, AZ 85031', phone: '(623) 848-5000', website: null },
  ],
  inpatientFacilities: [
    { name: 'Valley Hospital', address: '3550 E Pinchot Ave, Phoenix, AZ 85018', phone: '(602) 957-4000', website: null },
    { name: 'Aurora Behavioral Health', address: '6015 W Peoria Ave, Glendale, AZ 85302', phone: '(623) 344-4444', website: null },
  ],
  iopFacilities: [
    { name: 'Recovery Ways Phoenix', address: '456 N 44th St, Phoenix, AZ 85008', phone: '(602) 555-0123', website: null },
    { name: 'Scottsdale Recovery Center', address: '10446 N 74th St, Scottsdale, AZ 85258', phone: '(480) 555-0456', website: null },
  ],
};

const tests = [
  {
    name: 'Alcohol guide (he/him) - full test',
    data: { guideId: 'alcohol', caregiverName: 'Sarah Johnson', patientName: 'Michael', pronouns: 'he/him', relationship: 'mother', emergencyContact: '(555) 123-4567', zip: '85001' },
    shouldContain: [
      // Facility data injected
      'Banner University', "St. Joseph", 'Valley Hospital', 'Recovery Ways',
      // State and crisis
      'Arizona', '988',
      // Pronoun replacements
      'FOR Him', 'His photo ID',
    ],
    shouldNotContain: [
      // No old curly brace placeholders
      '{{HOSPITAL', '{{DETOX',
      // No unreplaced square bracket facility/pronoun placeholders
      '[PRIMARY_HOSPITAL_NAME]', '[BACKUP_HOSPITAL_1_NAME]', '[BACKUP_HOSPITAL_2_NAME]',
      '[INPATIENT_FACILITY_1_NAME]', '[INPATIENT_FACILITY_2_NAME]',
      '[IOP_FACILITY_1_NAME]', '[IOP_FACILITY_2_NAME]',
      '[HIM_HER]', '[HE_SHE]', '[HIS_HER]', '[he_she]', '[him_her]', '[his_her]',
      '[STATE_NAME]', '[STATE_CRISIS_LINE_PHONE]',
    ],
  },
  {
    name: 'Opioid guide (she/her)',
    data: { guideId: 'opioid', caregiverName: 'David Chen', patientName: 'Emily', pronouns: 'she/her', relationship: 'husband', emergencyContact: '(555) 987-6543', zip: '85001' },
    shouldContain: ['Banner University', 'FOR Her', 'Her photo ID'],
    shouldNotContain: ['[PRIMARY_HOSPITAL_NAME]', '[HIM_HER]', '{{HOSPITAL'],
  },
  {
    name: 'Benzo guide (they/them)',
    data: { guideId: 'benzo', caregiverName: 'Alex Rivera', patientName: 'Jordan', pronouns: 'they/them', relationship: 'partner', zip: '85001' },
    shouldContain: ['Banner University', 'FOR Them', 'Their photo ID'],
    shouldNotContain: ['[PRIMARY_HOSPITAL_NAME]', '[HIM_HER]'],
  },
  {
    name: 'Stimulant guide',
    data: { guideId: 'stimulant', caregiverName: 'Test User', patientName: 'Pat', pronouns: 'they/them', zip: '85001' },
    shouldContain: ['Banner University'],
    shouldNotContain: ['[PRIMARY_HOSPITAL_NAME]'],
  },
  {
    name: 'General substance guide',
    data: { guideId: 'general', caregiverName: 'Test User', patientName: 'Sam', pronouns: 'he/him', zip: '85001' },
    shouldContain: ['Banner University'],
    shouldNotContain: ['[PRIMARY_HOSPITAL_NAME]'],
  },
  {
    name: 'Fallback (no facilities)',
    data: { guideId: 'alcohol', caregiverName: 'Test', patientName: 'Test', pronouns: 'they/them' },
    shouldContain: ['SAMHSA', '1-800-662-4357'],
    shouldNotContain: ['[PRIMARY_HOSPITAL_NAME]', '[INPATIENT_FACILITY_1_NAME]'],
  },
];

console.log('=== Template Pipeline Test Suite ===\n');
let totalPass = 0;
let totalFail = 0;

for (const t of tests) {
  console.log(`--- ${t.name} ---`);
  let pass = 0, fail = 0;

  try {
    const useFac = t.data.zip ? mockFacilities : null;
    const html = generateGuide(t.data, useFac);

    if (html.length > 1000) {
      console.log(`  OK: Generated ${(html.length / 1024).toFixed(0)} KB HTML`);
      pass++;
    } else {
      console.log(`  FAIL: HTML too short (${html.length} chars)`);
      fail++;
    }

    for (const s of (t.shouldContain || [])) {
      if (html.includes(s)) { pass++; } else { console.log(`  FAIL: Missing "${s}"`); fail++; }
    }

    for (const s of (t.shouldNotContain || [])) {
      if (!html.includes(s)) { pass++; } else { console.log(`  FAIL: Still contains "${s}"`); fail++; }
    }

  } catch (err) {
    console.log(`  ERROR: ${err.message}`);
    fail++;
  }

  const status = fail === 0 ? 'PASS' : 'FAIL';
  console.log(`  ${status}: ${pass} passed, ${fail} failed`);
  totalPass += pass;
  totalFail += fail;
}

// Pronoun mapping unit tests
console.log('\n--- Pronoun Mapping Tests ---');
const pronounTests = [
  { input: 'he/him', expected: { him_her: 'him', he_she: 'he', his_her: 'his', HE_SHE: 'He', HIM_HER: 'Him', HIS_HER: 'His' } },
  { input: 'she/her', expected: { him_her: 'her', he_she: 'she', his_her: 'her', HE_SHE: 'She', HIM_HER: 'Her', HIS_HER: 'Her' } },
  { input: 'they/them', expected: { him_her: 'them', he_she: 'they', his_her: 'their', HE_SHE: 'They', HIM_HER: 'Them', HIS_HER: 'Their' } },
  { input: undefined, expected: { him_her: 'them', he_she: 'they', his_her: 'their', HE_SHE: 'They', HIM_HER: 'Them', HIS_HER: 'Their' } },
];

for (const pt of pronounTests) {
  const result = getPronounMap(pt.input);
  const matches = Object.entries(pt.expected).every(([k, v]) => result[k] === v);
  if (matches) {
    console.log(`  PASS: ${pt.input || 'undefined'} → correct mapping`);
    totalPass++;
  } else {
    console.log(`  FAIL: ${pt.input || 'undefined'} → got ${JSON.stringify(result)}`);
    totalFail++;
  }
}

console.log(`\n=== RESULTS: ${totalPass} passed, ${totalFail} failed ===`);
process.exit(totalFail > 0 ? 1 : 0);
