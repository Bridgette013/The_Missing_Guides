// netlify/functions/send-guide-email.js
// Sends the personalized PDF guide to the customer via SendGrid.

const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const FROM_EMAIL = 'guides@themissingguides.com';
const REPLY_TO_EMAIL = 'admin@vvvdigitals.com';
const SUPPORT_EMAIL = 'admin@vvvdigitals.com';

// Guide ID to friendly display name
const GUIDE_DISPLAY_NAMES = {
  alcohol: 'Alcohol Recovery Guide',
  opioid: 'Opioid Recovery Guide',
  benzo: 'Benzodiazepine Recovery Guide',
  benzodiazepine: 'Benzodiazepine Recovery Guide',
  stimulant: 'Stimulant Recovery Guide',
  general: 'General Substance Recovery Guide',
};

// Build the email HTML body
function buildEmailBody(customerFirstName, guideNames) {
  const guideList = guideNames.map((name) => `<li>${name}</li>`).join('\n');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: 'Calibri', 'Arial', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1a1a1a; line-height: 1.6;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #616BA5; font-size: 24px; margin-bottom: 5px;">The Missing Guides</h1>
    <p style="color: #8E8E8B; font-size: 14px;">Your personalized recovery guide is here.</p>
  </div>

  <div style="background: #f8f9fa; border-radius: 8px; padding: 25px; margin-bottom: 25px;">
    <p style="font-size: 18px; margin-top: 0;">Hi ${customerFirstName},</p>

    <p>Thank you so much for your purchase. We know this journey isn't easy, and we're honored you chose The Missing Guides to help you through it.</p>

    <p><strong>Your personalized guide${guideNames.length > 1 ? 's are' : ' is'} attached to this email as a PDF.</strong></p>

    <p>Here's what's included:</p>
    <ul style="padding-left: 20px;">
      ${guideList}
    </ul>

    <p>${guideNames.length > 1 ? 'Each guide has' : 'Your guide has'} been personalized with your information and local resources near your area.</p>
  </div>

  <div style="background: #E8F0F8; border-left: 4px solid #616BA5; padding: 15px 20px; margin-bottom: 25px; border-radius: 4px;">
    <p style="margin: 0 0 10px 0; font-weight: 700;">How to use your guide:</p>
    <ol style="margin: 0; padding-left: 20px;">
      <li><strong>Print it out</strong> — these guides are designed for print. Having a physical copy matters in a crisis.</li>
      <li><strong>Fill in the worksheets</strong> — use the blank forms and checklists as you go.</li>
      <li><strong>Keep it close</strong> — put it where you can grab it when you need it most.</li>
    </ol>
  </div>

  <div style="margin-bottom: 25px;">
    <p>If you have any questions or need help, please don't hesitate to reach out:</p>
    <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${SUPPORT_EMAIL}" style="color: #616BA5;">${SUPPORT_EMAIL}</a></p>
  </div>

  <div style="margin-bottom: 25px;">
    <p style="margin: 0;">You're not alone in this. You're doing the right thing.</p>
    <p style="margin: 10px 0 0 0; font-weight: 700;">— Brit & The Missing Guides Team</p>
  </div>

  <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">

  <div style="font-size: 12px; color: #8E8E8B; text-align: center;">
    <p>If someone you love is in immediate danger, call 911.<br>
    988 Suicide & Crisis Lifeline: Call or text 988<br>
    SAMHSA National Helpline: 1-800-662-4357</p>
    <p style="margin-top: 15px;">&copy; ${new Date().getFullYear()} The Missing Guides by VVV Digitals LLC. All rights reserved.</p>
  </div>
</body>
</html>`;
}

// Send the guide email with PDF attachment(s)
async function sendGuideEmail({ customerEmail, customerName, guideIds, pdfBuffers }) {
  const customerFirstName = (customerName || 'there').split(' ')[0];

  const guideNames = guideIds.map(
    (id) => GUIDE_DISPLAY_NAMES[id] || `Recovery Guide`
  );

  // Build subject line
  const subjectGuideName =
    guideNames.length > 1
      ? 'Recovery Guide Bundle'
      : guideNames[0];
  const subject = `Your ${subjectGuideName} is ready, ${customerFirstName}`;

  // Build attachments from PDF buffers
  const attachments = pdfBuffers.map((buf, i) => {
    const guideName = guideNames[i] || 'Recovery Guide';
    const filename = `The_Missing_Guide_${guideIds[i]
      .replace(/\s+/g, '_')
      .toUpperCase()}.pdf`;

    return {
      content: buf.toString('base64'),
      filename,
      type: 'application/pdf',
      disposition: 'attachment',
    };
  });

  const msg = {
    to: customerEmail,
    from: { email: FROM_EMAIL, name: 'The Missing Guides' },
    replyTo: { email: REPLY_TO_EMAIL, name: 'The Missing Guides Support' },
    subject,
    html: buildEmailBody(customerFirstName, guideNames),
    attachments,
  };

  await sgMail.send(msg);
  console.log(`Guide email sent to ${customerEmail} (${guideIds.join(', ')})`);
}

// Send a failure alert to the admin
async function sendFailureAlert({ customerEmail, customerName, guideIds, error, sessionId }) {
  const msg = {
    to: SUPPORT_EMAIL,
    from: { email: FROM_EMAIL, name: 'The Missing Guides - ALERT' },
    subject: `[ALERT] Guide fulfillment failed for ${customerEmail}`,
    html: `
      <h2>Guide Fulfillment Failed</h2>
      <p><strong>Customer:</strong> ${customerName} (${customerEmail})</p>
      <p><strong>Guide(s):</strong> ${guideIds.join(', ')}</p>
      <p><strong>Stripe Session:</strong> ${sessionId}</p>
      <p><strong>Error:</strong> ${error}</p>
      <p><strong>Time:</strong> ${new Date().toISOString()}</p>
      <hr>
      <p>This order needs manual fulfillment. Check Stripe dashboard for full order details.</p>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log(`Failure alert sent to ${SUPPORT_EMAIL}`);
  } catch (alertError) {
    console.error('Failed to send failure alert email:', alertError.message);
  }
}

// HTTP handler (for testing or direct invocation)
exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const body = JSON.parse(event.body);
    await sendGuideEmail(body);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Email sent' }),
    };
  } catch (error) {
    console.error('Error sending guide email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send email', details: error.message }),
    };
  }
};

// Export for direct use by stripe-webhook.js
exports.sendGuideEmail = sendGuideEmail;
exports.sendFailureAlert = sendFailureAlert;
