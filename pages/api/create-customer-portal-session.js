import stripe from '../../stripe-lib/stripe'
import bundles from '../../data/bundles'

const DOMAIN = 'http://localhost:3000/'

export default async function handler (req, res) {
  const { customerStripeId } = req.body

  try {
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: '{{CUSTOMER_ID}}',
      return_url: `${DOMAIN}success`
    })

    res.send({
      url: portalSession.url
    })
  } catch (e) {
    res.status(400)

    return res.send({
      error: {
        message: e.message
      }
    })
  }
}
