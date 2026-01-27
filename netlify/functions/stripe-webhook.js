const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

exports.handler = async (event) => {
  const sig = event.headers['stripe-signature']
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  try {
    // Verify webhook signature
    const stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      webhookSecret
    )

    // Handle successful payment
    if (stripeEvent.type === 'checkout.session.completed') {
      const session = stripeEvent.data.object

      const { guideId, personalizationData } = session.metadata
      const parsedData = JSON.parse(personalizationData)

      // Generate personalized guide(s)
      const guides = guideId === 'bundle' 
        ? ['alcohol', 'opioid', 'stimulant', 'benzo', 'general']
        : [guideId]

      // TODO: Generate guides and upload to temporary storage
      // TODO: Send email with download links

      const emailData = {
        to: session.customer_email,
        from: process.env.SUPPORT_EMAIL,
        subject: 'Your Missing Guide is Ready',
        html: `
          <h1>Your Guide is Ready</h1>
          <p>Hi ${parsedData.caregiverName},</p>
          <p>Your personalized guide is ready for download.</p>
          <p><a href="${process.env.SITE_URL}/download/${session.id}">Download Your Guide</a></p>
          <p>This link will expire in 7 days.</p>
          <p>- The Missing Guides Team</p>
        `
      }

      if (process.env.ENABLE_EMAIL_DELIVERY === 'true') {
        await sgMail.send(emailData)
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true })
    }
  } catch (error) {
    console.error('Webhook error:', error)
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Webhook error' })
    }
  }
}
