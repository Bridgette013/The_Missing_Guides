/**
 * Pass 3: Replace hardcoded AZ-specific facility data in non-alcohol templates.
 * All 4 templates (opioid, benzo, stimulant, general) have identical facility sections.
 */

const fs = require('fs');
const path = require('path');

const TEMPLATES_DIR = path.join(__dirname, '..', 'public', 'templates');

const templates = [
  'TMG_OPIOID_RECOVERY_GUIDE_TEMPLATE.html',
  'TMG_BENZODIAZEPINE_RECOVERY_GUIDE_TEMPLATE.html',
  'TMG_STIMULANT_RECOVERY_GUIDE_TEMPLATE.html',
  'TMG_GENERAL_SUBSTANCE_RECOVERY_GUIDE_TEMPLATE.html',
];

const replacements = [
  // === HOSPITALS FOR DETOX section ===

  // Hospital 1: Banner Thunderbird → PRIMARY_HOSPITAL
  ['<h3>Banner Thunderbird Medical Center</h3>', '<h3>[PRIMARY_HOSPITAL_NAME]</h3>'],
  ['<p class="phone">📞 (602) 865-5555</p>\n        <p class="address">📍 5555 W Thunderbird Rd, Glendale, AZ 85306</p>\n        <p class="notes">Emergency Room - Full medical detox services</p>',
   '<p class="phone">📞 [PRIMARY_HOSPITAL_PHONE]</p>\n        <p class="address">📍 [PRIMARY_HOSPITAL_ADDRESS]</p>\n        <p class="notes">Emergency Room - Medical detox services available</p>'],

  // Hospital 2: Aurora West → BACKUP_HOSPITAL_1
  ['<h3>Aurora Behavioral Health West</h3>', '<h3>[BACKUP_HOSPITAL_1_NAME]</h3>'],
  ['<p class="phone">📞 (623) 344-4400</p>\n        <p class="phone">📞 24/7 Crisis: (877) 870-7012</p>\n        <p class="address">📍 6015 W Peoria Ave, Glendale, AZ 85302</p>\n        <p class="notes">Psychiatric hospital with detox unit - Behavioral health focus</p>',
   '<p class="phone">📞 [BACKUP_HOSPITAL_1_PHONE]</p>\n        <p class="phone">📞 24/7 Crisis: [BACKUP_HOSPITAL_1_CRISIS]</p>\n        <p class="address">📍 [BACKUP_HOSPITAL_1_ADDRESS]</p>\n        <p class="notes">Alternative hospital option - Detox services available</p>'],

  // Hospital 3: Aurora East → BACKUP_HOSPITAL_2
  ['<h3>Aurora Behavioral Health East</h3>', '<h3>[BACKUP_HOSPITAL_2_NAME]</h3>'],
  ['<p class="phone">📞 (480) 345-5420</p>\n        <p class="address">📍 6350 S Maple Ave, Tempe, AZ 85283</p>\n        <p class="notes">Alternative location if closer or West is full</p>',
   '<p class="phone">📞 [BACKUP_HOSPITAL_2_PHONE]</p>\n        <p class="address">📍 [BACKUP_HOSPITAL_2_ADDRESS]</p>\n        <p class="notes">Alternative location - Backup option for detox services</p>'],

  // === INPATIENT TREATMENT FACILITIES section ===

  // Inpatient 1: The Meadows → INPATIENT_FACILITY_1
  ['<h3>The Meadows</h3>', '<h3>[INPATIENT_FACILITY_1_NAME]</h3>'],
  ['<p class="phone">📞 (800) 632-3697</p>\n        <p class="address">📍 1655 N Tegner St, Wickenburg, AZ 85390</p>\n        <p class="notes">30-90 day residential program - Nationally recognized, trauma-focused, accepts many insurance plans</p>',
   '<p class="phone">📞 [INPATIENT_FACILITY_1_PHONE]</p>\n        <p class="address">📍 [INPATIENT_FACILITY_1_ADDRESS]</p>\n        <p class="notes">Residential treatment program - Contact for program details and insurance verification</p>'],

  // Inpatient 2: Cottonwood Tucson → INPATIENT_FACILITY_2
  ['<h3>Cottonwood Tucson</h3>', '<h3>[INPATIENT_FACILITY_2_NAME]</h3>'],
  ['<p class="phone">📞 (888) 727-0441</p>\n        <p class="address">📍 4110 W Sweetwater Dr, Tucson, AZ 85745</p>\n        <p class="notes">45+ day residential program - Holistic approach, co-occurring disorders, luxury setting</p>',
   '<p class="phone">📞 [INPATIENT_FACILITY_2_PHONE]</p>\n        <p class="address">📍 [INPATIENT_FACILITY_2_ADDRESS]</p>\n        <p class="notes">Alternative treatment facility - Contact for program details and availability</p>'],

  // === WALLET CARD section ===
  ['<strong>Banner Thunderbird:</strong> (602) 865-5555', '<strong>[PRIMARY_HOSPITAL_NAME]:</strong> [PRIMARY_HOSPITAL_PHONE]'],
  ['<strong>Aurora West:</strong> (877) 870-7012', '<strong>[BACKUP_HOSPITAL_1_NAME]:</strong> [BACKUP_HOSPITAL_1_PHONE]'],

  // === Inline facility references (in IOP section) ===
  ['<strong>The Meadows</strong> - (800) 632-3697', '<strong>[INPATIENT_FACILITY_1_NAME]</strong> - [INPATIENT_FACILITY_1_PHONE]'],
  ['<strong>Cottonwood Tucson</strong> - (888) 727-0441', '<strong>[INPATIENT_FACILITY_2_NAME]</strong> - [INPATIENT_FACILITY_2_PHONE]'],
];

console.log('Template update pass 3 (hardcoded AZ facilities)...\n');
let totalChanges = 0;

for (const template of templates) {
  const filepath = path.join(TEMPLATES_DIR, template);
  let html = fs.readFileSync(filepath, 'utf-8');
  let changes = 0;

  for (const [find, replace] of replacements) {
    const count = html.split(find).length - 1;
    if (count > 0) {
      html = html.split(find).join(replace);
      changes += count;
    }
  }

  fs.writeFileSync(filepath, html, 'utf-8');
  console.log(`  ${template}: ${changes} replacements`);
  totalChanges += changes;
}

console.log(`\nDone. Total: ${totalChanges}`);

// Verify no AZ-specific facilities remain
console.log('\nVerification - checking for remaining hardcoded facilities:');
for (const template of templates) {
  const filepath = path.join(TEMPLATES_DIR, template);
  const html = fs.readFileSync(filepath, 'utf-8');

  const check = [
    'Banner Thunderbird', 'Aurora Behavioral', 'The Meadows', 'Cottonwood Tucson',
    '602) 865-5555', '623) 344-4400', '877) 870-7012', '480) 345-5420',
    '800) 632-3697', '888) 727-0441',
  ];

  const found = check.filter(s => html.includes(s));
  if (found.length > 0) {
    console.log(`  WARNING ${template}: still contains: ${found.join(', ')}`);
  } else {
    console.log(`  OK ${template}: clean`);
  }
}
