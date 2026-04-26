const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const GUIDES = {
  alcohol:   { name: 'The Missing Guide to Alcohol Recovery',        price: 9700 },
  opioid:    { name: 'The Missing Guide to Opioid Recovery',         price: 9700 },
  stimulant: { name: 'The Missing Guide to Stimulant Recovery',      price: 9700 },
  benzo:     { name: 'The Missing Guide to Benzodiazepine Recovery', price: 9700 },
  general:   { name: 'The Missing Guide to Substance Recovery',      price: 9700 },
  bundle:    { name: 'Complete Recovery Bundle — All 5 Guides',      price: 29700 },
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  try {
    const { guideId, personalizationData } = JSON.parse(event.body)
    const guide = GUIDES[guideId]

    if (!guide) {
      throw new Error('Invalid guide ID')
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: guide.name },
          unit_amount: guide.price,
        },
        quantity: 1,
      }],
      success_url: `${process.env.SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.SITE_URL}/guide/${guideId}`,
      customer_email: personalizationData.email,
      metadata: {
        guideId,
        personalizationData: JSON.stringify(personalizationData),
      },
    })

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: session.url }),
    }
  } catch (error) {
    console.error('Stripe error:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    }
  }
}
