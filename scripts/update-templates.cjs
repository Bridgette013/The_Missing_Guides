/**
 * Script to update all 5 guide templates:
 * 1. Convert {{HOSPITAL_*}} curly-brace placeholders to [SQUARE_BRACKET] format
 * 2. Rename hospital/detox placeholders to new naming convention
 * 3. Replace hardcoded IOP facilities with placeholders
 * 4. Replace hardcoded pronoun references with pronoun placeholders
 * 5. Add state-specific placeholders
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

// Facility placeholder mappings (curly braces → square brackets)
const facilityReplacements = [
  // Hospital 1 → PRIMARY_HOSPITAL
  ['{{HOSPITAL_1_NAME}}', '[PRIMARY_HOSPITAL_NAME]'],
  ['{{HOSPITAL_1_ADDRESS}}', '[PRIMARY_HOSPITAL_ADDRESS]'],
  ['{{HOSPITAL_1_PHONE}}', '[PRIMARY_HOSPITAL_PHONE]'],
  ['{{HOSPITAL_1_WEBSITE}}', '[PRIMARY_HOSPITAL_WEBSITE]'],
  // Hospital 2 → BACKUP_HOSPITAL_1
  ['{{HOSPITAL_2_NAME}}', '[BACKUP_HOSPITAL_1_NAME]'],
  ['{{HOSPITAL_2_ADDRESS}}', '[BACKUP_HOSPITAL_1_ADDRESS]'],
  ['{{HOSPITAL_2_PHONE}}', '[BACKUP_HOSPITAL_1_PHONE]'],
  ['{{HOSPITAL_2_WEBSITE}}', '[BACKUP_HOSPITAL_1_WEBSITE]'],
  // Hospital 3 → BACKUP_HOSPITAL_2
  ['{{HOSPITAL_3_NAME}}', '[BACKUP_HOSPITAL_2_NAME]'],
  ['{{HOSPITAL_3_ADDRESS}}', '[BACKUP_HOSPITAL_2_ADDRESS]'],
  ['{{HOSPITAL_3_PHONE}}', '[BACKUP_HOSPITAL_2_PHONE]'],
  ['{{HOSPITAL_3_WEBSITE}}', '[BACKUP_HOSPITAL_2_WEBSITE]'],
  // Detox 1 → INPATIENT_FACILITY_1
  ['{{DETOX_1_NAME}}', '[INPATIENT_FACILITY_1_NAME]'],
  ['{{DETOX_1_ADDRESS}}', '[INPATIENT_FACILITY_1_ADDRESS]'],
  ['{{DETOX_1_PHONE}}', '[INPATIENT_FACILITY_1_PHONE]'],
  ['{{DETOX_1_WEBSITE}}', '[INPATIENT_FACILITY_1_WEBSITE]'],
  // Detox 2 → INPATIENT_FACILITY_2
  ['{{DETOX_2_NAME}}', '[INPATIENT_FACILITY_2_NAME]'],
  ['{{DETOX_2_ADDRESS}}', '[INPATIENT_FACILITY_2_ADDRESS]'],
  ['{{DETOX_2_PHONE}}', '[INPATIENT_FACILITY_2_PHONE]'],
  ['{{DETOX_2_WEBSITE}}', '[INPATIENT_FACILITY_2_WEBSITE]'],
  // Detox 3 → INPATIENT_FACILITY_3 (if it exists)
  ['{{DETOX_3_NAME}}', '[INPATIENT_FACILITY_3_NAME]'],
  ['{{DETOX_3_ADDRESS}}', '[INPATIENT_FACILITY_3_ADDRESS]'],
  ['{{DETOX_3_PHONE}}', '[INPATIENT_FACILITY_3_PHONE]'],
  ['{{DETOX_3_WEBSITE}}', '[INPATIENT_FACILITY_3_WEBSITE]'],
];

// Hardcoded IOP facility replacements
// These are Arizona-specific facilities that need to become dynamic placeholders
const iopReplacements = [
  // Calvary Healing Center → IOP_FACILITY_1
  {
    find: /<div class="contact-card outpatient">\s*<h3>Calvary Healing Center<\/h3>\s*<p class="phone">📞 \(602\) 279-1468<\/p>\s*<p class="address">📍 717 E Monroe St, Phoenix, AZ 85034<\/p>\s*<p class="notes">Faith-based program - Men's and women's programs, sliding scale fees, 12-step focus<\/p>/g,
    replace: `<div class="contact-card outpatient">
        <h3>[IOP_FACILITY_1_NAME]</h3>
        <p class="phone">📞 [IOP_FACILITY_1_PHONE]</p>
        <p class="address">📍 [IOP_FACILITY_1_ADDRESS]</p>
        <p class="notes">Intensive outpatient program - Contact for program details and scheduling</p>`
  },
  // Terros Health → IOP_FACILITY_2
  {
    find: /<div class="contact-card outpatient">\s*<h3>Terros Health<\/h3>\s*<p class="phone">📞 \(602\) 685-6000<\/p>\s*<p class="address">📍 Multiple Valley locations<\/p>\s*<p class="notes">Non-profit behavioral health - IOP, counseling, medication management, accepts Medicaid<\/p>/g,
    replace: `<div class="contact-card outpatient">
        <h3>[IOP_FACILITY_2_NAME]</h3>
        <p class="phone">📞 [IOP_FACILITY_2_PHONE]</p>
        <p class="address">📍 [IOP_FACILITY_2_ADDRESS]</p>
        <p class="notes">Outpatient treatment program - Contact for services and availability</p>`
  },
  // Community Bridges → general SAMHSA reference
  {
    find: /<div class="contact-card outpatient">\s*<h3>Community Bridges<\/h3>\s*<p class="phone">📞 \(480\) 831-7566<\/p>\s*<p class="address">📍 Multiple locations in Mesa, Phoenix, Scottsdale<\/p>\s*<p class="notes">IOP and outpatient counseling - Low-cost options, flexible scheduling<\/p>/g,
    replace: `<div class="contact-card outpatient">
        <h3>SAMHSA National Helpline</h3>
        <p class="phone">📞 1-800-662-4357</p>
        <p class="address">📍 samhsa.gov/find-treatment</p>
        <p class="notes">Free 24/7 referral service - Find local treatment options, including IOP programs</p>`
  },
];

// Arizona-specific crisis line replacement
const stateReplacements = [
  // AZ Crisis Line → state placeholder
  ['1-844-534-4673 - AZ Crisis Line', '[STATE_CRISIS_LINE_PHONE] - [STATE_NAME] Crisis Line'],
  ['AZ Crisis Line', '[STATE_NAME] Crisis Line'],
];

// Pronoun replacements - targeted, context-aware
// These are for patient-referring pronouns in key visible sections
const pronounReplacements = [
  // Uppercase/header pronoun references about the patient
  ['FOR HIM - ABSOLUTE ESSENTIALS:', 'FOR [HIM_HER] - ABSOLUTE ESSENTIALS:'],
  ['FOR HER - ABSOLUTE ESSENTIALS:', 'FOR [HIM_HER] - ABSOLUTE ESSENTIALS:'],
  ['FOR THEM - ABSOLUTE ESSENTIALS:', 'FOR [HIM_HER] - ABSOLUTE ESSENTIALS:'],

  // Possessive pronouns in checklists (patient's items)
  ['His photo ID / Driver\'s License', '[HIS_HER] photo ID / Driver\'s License'],
  ['Her photo ID / Driver\'s License', '[HIS_HER] photo ID / Driver\'s License'],
  ['Their photo ID / Driver\'s License', '[HIS_HER] photo ID / Driver\'s License'],

  ['His phone + charger', '[HIS_HER] phone + charger'],
  ['Her phone + charger', '[HIS_HER] phone + charger'],
  ['Their phone + charger', '[HIS_HER] phone + charger'],

  // "he wears" type references
  ['(if he wears them)', '(if [he_she] wears them)'],
  ['(if she wears them)', '(if [he_she] wears them)'],
  ['(if they wear them)', '(if [he_she] wears them)'],

  // Relapse plan section
  ['If He Drinks Again', 'If [HE_SHE] Relapses'],
  ['If She Drinks Again', 'If [HE_SHE] Relapses'],
  ['If They Drink Again', 'If [HE_SHE] Relapses'],
  ['If He Uses Again', 'If [HE_SHE] Relapses'],
  ['If She Uses Again', 'If [HE_SHE] Relapses'],
  ['If They Use Again', 'If [HE_SHE] Relapses'],

  // "if he's violent or suicidal" in relapse plan
  ['if he\'s violent or suicidal', 'if [he_she] is violent or suicidal'],
  ['if she\'s violent or suicidal', 'if [he_she] is violent or suicidal'],

  // "if he's enrolled"
  ['He must leave the house', '[HE_SHE] must leave the house'],
  ['She must leave the house', '[HE_SHE] must leave the house'],
  ['He cannot return until he\'s enrolled', '[HE_SHE] cannot return until [he_she] is enrolled'],
  ['She cannot return until she\'s enrolled', '[HE_SHE] cannot return until [he_she] is enrolled'],
  ['he\'s enrolled in treatment', '[he_she] is enrolled in treatment'],
  ['she\'s enrolled in treatment', '[he_she] is enrolled in treatment'],

  // "call in sick for him"
  ['call in sick for him', 'call in sick for [him_her]'],
  ['call in sick for her', 'call in sick for [him_her]'],
  ['excuses to family', 'excuses to family'],

  // "Lives at home" IOP section - generic, keep as-is

  // "Goes home after detox" - generic, keep as-is
];

// Arizona-specific references in AA/support group sections
const azReplacements = [
  ['Phoenix: (602) 264-1341', '[STATE_NAME] AA Hotline'],
  ['azaa.org', 'aa.org'],
];

function processTemplate(filename) {
  const filepath = path.join(TEMPLATES_DIR, filename);
  let html = fs.readFileSync(filepath, 'utf-8');
  let changeCount = 0;

  // 1. Replace facility placeholders (curly braces → square brackets)
  for (const [find, replace] of facilityReplacements) {
    const count = (html.match(new RegExp(escapeRegex(find), 'g')) || []).length;
    if (count > 0) {
      html = html.split(find).join(replace);
      changeCount += count;
    }
  }

  // 2. Replace hardcoded IOP facilities with placeholders
  for (const { find, replace } of iopReplacements) {
    const before = html;
    html = html.replace(find, replace);
    if (html !== before) changeCount++;
  }

  // 3. Replace state-specific references
  for (const [find, replace] of stateReplacements) {
    const count = (html.match(new RegExp(escapeRegex(find), 'g')) || []).length;
    if (count > 0) {
      html = html.split(find).join(replace);
      changeCount += count;
    }
  }

  // 4. Replace pronoun references
  for (const [find, replace] of pronounReplacements) {
    const count = (html.match(new RegExp(escapeRegex(find), 'g')) || []).length;
    if (count > 0) {
      html = html.split(find).join(replace);
      changeCount += count;
    }
  }

  // 5. Replace AZ-specific references
  for (const [find, replace] of azReplacements) {
    const count = (html.match(new RegExp(escapeRegex(find), 'g')) || []).length;
    if (count > 0) {
      html = html.split(find).join(replace);
      changeCount += count;
    }
  }

  // 6. Add [YOUR_NAME] and [RELATIONSHIP] to the personalization instruction box
  // Replace the instruction section to include all new placeholders
  html = html.replace(
    /<li><strong>\[YOUR_NAME\]<\/strong> = Your name as the primary support person<\/li>/,
    `<li><strong>[YOUR_NAME]</strong> = Your name as the primary support person</li>
            <li><strong>[RELATIONSHIP]</strong> = Your relationship to the patient (e.g., "mother", "partner")</li>
            <li><strong>[EMERGENCY_CONTACT]</strong> = Emergency contact phone number</li>`
  );

  fs.writeFileSync(filepath, html, 'utf-8');
  console.log(`  ${filename}: ${changeCount} replacements made`);
  return changeCount;
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

console.log('Updating templates...\n');
let totalChanges = 0;
for (const template of templates) {
  try {
    totalChanges += processTemplate(template);
  } catch (err) {
    console.error(`  ERROR processing ${template}: ${err.message}`);
  }
}
console.log(`\nDone. Total replacements: ${totalChanges}`);
