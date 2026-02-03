/**
 * Pass 4: Replace remaining hardcoded AZ facility data in Quick Start
 * and inline reference sections of non-alcohol templates.
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

// Quick Start section - inline hospital references
const replacements = [
  // Primary hospital in Quick Start
  ['Banner Thunderbird Medical Center', '[PRIMARY_HOSPITAL_NAME]'],
  ['5555 W Thunderbird Rd, Glendale, AZ 85306', '[PRIMARY_HOSPITAL_ADDRESS]'],
  ['(602) 865-5555', '[PRIMARY_HOSPITAL_PHONE]'],
  ['Banner Thunderbird', '[PRIMARY_HOSPITAL_NAME]'],

  // Backup hospital in Quick Start
  ['Aurora Behavioral Health - West', '[BACKUP_HOSPITAL_1_NAME]'],
  ['Aurora Behavioral Health West', '[BACKUP_HOSPITAL_1_NAME]'],
  ['6015 W Peoria Ave, Glendale, AZ 85302', '[BACKUP_HOSPITAL_1_ADDRESS]'],
  ['(623) 344-4400', '[BACKUP_HOSPITAL_1_PHONE]'],
  ['(877) 870-7012', '[BACKUP_HOSPITAL_1_CRISIS]'],

  // Aurora East (3rd hospital)
  ['Aurora Behavioral Health East', '[BACKUP_HOSPITAL_2_NAME]'],
  ['(480) 345-5420', '[BACKUP_HOSPITAL_2_PHONE]'],
  ['6350 S Maple Ave, Tempe, AZ 85283', '[BACKUP_HOSPITAL_2_ADDRESS]'],

  // Inpatient inline references
  ['The Meadows (Wickenburg)', '[INPATIENT_FACILITY_1_NAME]'],
  ['The Meadows</h3>', '[INPATIENT_FACILITY_1_NAME]</h3>'],
  ['(800) 632-3697', '[INPATIENT_FACILITY_1_PHONE]'],
  ['1655 N Tegner St, Wickenburg, AZ 85390', '[INPATIENT_FACILITY_1_ADDRESS]'],

  ['Cottonwood Tucson', '[INPATIENT_FACILITY_2_NAME]'],
  ['(888) 727-0441', '[INPATIENT_FACILITY_2_PHONE]'],
  ['4110 W Sweetwater Dr, Tucson, AZ 85745', '[INPATIENT_FACILITY_2_ADDRESS]'],
];

console.log('Template update pass 4 (remaining inline facility data)...\n');
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

// Verify
console.log('\nVerification:');
const checkList = [
  'Banner Thunderbird', 'Aurora Behavioral', 'The Meadows', 'Cottonwood Tucson',
  '602) 865-5555', '623) 344-4400', '877) 870-7012', '480) 345-5420',
  '800) 632-3697', '888) 727-0441',
];
for (const template of templates) {
  const filepath = path.join(TEMPLATES_DIR, template);
  const html = fs.readFileSync(filepath, 'utf-8');
  const found = checkList.filter(s => html.includes(s));
  if (found.length > 0) {
    console.log(`  WARNING ${template}: still contains: ${found.join(', ')}`);
  } else {
    console.log(`  OK ${template}: clean`);
  }
}
