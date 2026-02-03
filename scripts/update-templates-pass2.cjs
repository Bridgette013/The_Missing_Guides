/**
 * Second pass: fix remaining hardcoded AZ-specific data in templates
 * - IOP facility list items (non-contact-card format)
 * - AZ crisis line references
 */

const fs = require('fs');
const path = require('path');

const TEMPLATES_DIR = path.join(__dirname, '..', 'public', 'templates');

const templates = [
  'TMG_ALCOHOL_RECOVERY_GUIDE_TEMPLATE.html',
  'TMG_OPIOID_RECOVERY_GUIDE_TEMPLATE.html',
  'TMG_BENZODIAZEPINE_RECOVERY_GUIDE_TEMPLATE.html',
  'TMG_STIMULANT_RECOVERY_GUIDE_TEMPLATE.html',
  'TMG_GENERAL_SUBSTANCE_RECOVERY_GUIDE_TEMPLATE.html',
];

const replacements = [
  // Inline IOP facility list items
  ['<li><strong>Calvary Healing Center</strong> - (602) 279-1468</li>', '<li><strong>[IOP_FACILITY_1_NAME]</strong> - [IOP_FACILITY_1_PHONE]</li>'],
  ['<li><strong>Terros Health</strong> - (602) 685-6000</li>', '<li><strong>[IOP_FACILITY_2_NAME]</strong> - [IOP_FACILITY_2_PHONE]</li>'],

  // AZ crisis line in crisis section
  ['Arizona Crisis Line (24/7):', '[STATE_NAME] Crisis Line (24/7):'],
  ['<p class="crisis-number">📞 1-844-534-4673</p>', '<p class="crisis-number">📞 [STATE_CRISIS_LINE_PHONE]</p>'],

  // AZ crisis line in wallet/footer
  ['Crisis Line: 1-844-534-4673', 'Crisis Line: [STATE_CRISIS_LINE_PHONE]'],

  // "If he's in immediate danger" → pronoun placeholder
  ['If he\'s in immediate danger or you are:', 'If [he_she] is in immediate danger or you are:'],
  ['If she\'s in immediate danger or you are:', 'If [he_she] is in immediate danger or you are:'],
];

console.log('Template update pass 2...\n');
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
