const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  try {
    const { guideId, personalizationData, isBundle } = JSON.parse(event.body)

    // Determine price based on guide or bundle
    let priceId
    if (isBundle) {
      priceId = process.env.STRIPE_PRICE_BUNDLE
    } else {
      const priceMap = {
        // TEMPORARY: Test mode price ID - switch back to live price after testing
        'alcohol': 'price_1SwlW2BgiaEKVIS7jniM4JLG',
        'opioid': process.env.STRIPE_PRICE_OPIOID,
        'stimulant': process.env.STRIPE_PRICE_STIMULANT,
        'benzo': process.env.STRIPE_PRICE_BENZO,
        'general': process.env.STRIPE_PRICE_GENERAL
      }
      priceId = priceMap[guideId]
    }

    if (!priceId) {
      throw new Error('Invalid guide ID')
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.SITE_URL}/guide/${guideId}`,
      customer_email: personalizationData.email,
      metadata: {
        guideId: isBundle ? 'bundle' : guideId,
        personalizationData: JSON.stringify(personalizationData)
      }
    })

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url: session.url })
    }
  } catch (error) {
    console.error('Stripe error:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    }
  }
}
