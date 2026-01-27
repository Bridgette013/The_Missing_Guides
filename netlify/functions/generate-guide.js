const fs = require('fs').promises
const path = require('path')

exports.handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  try {
    const {
      guideId,
      caregiverName,
      patientName,
      pronouns,
      relationship,
      emergencyContact,
      hospital,
      date
    } = JSON.parse(event.body)

    // Load template
    const templatePath = path.join(process.cwd(), 'public', 'templates', `TMG_${guideId.toUpperCase()}_RECOVERY_GUIDE_TEMPLATE.html`)
    let guideHTML = await fs.readFile(templatePath, 'utf-8')

    // Replace placeholders
    const replacements = {
      '\\[Your Name\\]': caregiverName || '[Your Name]',
      '\\[Patient Name\\]': patientName || '[Patient Name]',
      '\\[Pronouns\\]': pronouns || 'they/them',
      '\\[Relationship\\]': relationship || '[Relationship]',
      '\\[Emergency Contact\\]': emergencyContact || '[Emergency Contact]',
      '\\[Hospital Name\\]': hospital || '[Hospital Name]',
      '\\[Date\\]': date || new Date().toLocaleDateString()
    }

    // Apply replacements
    for (const [placeholder, value] of Object.entries(replacements)) {
      const regex = new RegExp(placeholder, 'g')
      guideHTML = guideHTML.replace(regex, value)
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: true,
        html: guideHTML
      })
    }
  } catch (error) {
    console.error('Error generating guide:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to generate guide' })
    }
  }
}
