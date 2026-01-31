const fs = require('fs').promises
const path = require('path')

// Fetch local facilities from the Netlify function
async function getLocalFacilities(zip) {
  try {
    const baseUrl = process.env.URL || 'http://localhost:8888'
    const response = await fetch(`${baseUrl}/.netlify/functions/get-local-facilities`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ zip })
    })

    if (!response.ok) {
      console.warn(`Failed to fetch facilities: ${response.status}`)
      return null
    }

    return await response.json()
  } catch (error) {
    console.warn('Error fetching local facilities:', error.message)
    return null
  }
}

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
      zip,
      hospital,
      date
    } = JSON.parse(event.body)

    // Load template
    const templatePath = path.join(process.cwd(), 'public', 'templates', `TMG_${guideId.toUpperCase()}_RECOVERY_GUIDE_TEMPLATE.html`)
    let guideHTML = await fs.readFile(templatePath, 'utf-8')

    // Fetch local facilities if ZIP is provided
    let facilitiesData = null
    if (zip) {
      facilitiesData = await getLocalFacilities(zip)
    }

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

    // Add facility placeholders if data is available
    if (facilitiesData && facilitiesData.success) {
      const hospitals = facilitiesData.hospitals || []
      const detoxFacilities = facilitiesData.detoxFacilities || []

      // Add hospital placeholders
      for (let i = 0; i < 3; i++) {
        const hospital = hospitals[i]
        replacements[`{{HOSPITAL_${i + 1}_NAME}}`] = hospital?.name || `[Hospital ${i + 1}]`
        replacements[`{{HOSPITAL_${i + 1}_ADDRESS}}`] = hospital?.address || `[Address]`
        replacements[`{{HOSPITAL_${i + 1}_PHONE}}`] = hospital?.phone || `[Phone]`
        replacements[`{{HOSPITAL_${i + 1}_WEBSITE}}`] = hospital?.website || ''
      }

      // Add detox facility placeholders
      for (let i = 0; i < 3; i++) {
        const facility = detoxFacilities[i]
        replacements[`{{DETOX_${i + 1}_NAME}}`] = facility?.name || `[Detox Facility ${i + 1}]`
        replacements[`{{DETOX_${i + 1}_ADDRESS}}`] = facility?.address || `[Address]`
        replacements[`{{DETOX_${i + 1}_PHONE}}`] = facility?.phone || `[Phone]`
        replacements[`{{DETOX_${i + 1}_WEBSITE}}`] = facility?.website || ''
      }
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
