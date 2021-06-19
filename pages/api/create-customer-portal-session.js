import stripeForServer from '../../stripe-lib/stripe'
import bundles from '../../data/bundles'

const DOMAIN = 'http://localhost:3000/'

export default async function handler (req, res) {
  const { customerStripeId } = req.body

  try {
    const portalSession = await stripeForServer.billingPortal.sessions.create({
      customer: customerStripeId,
      return_url: `${DOMAIN}customer-portal-success`
    })

    res.send({
      url: portalSession.url
    })
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message
      }
    })
  }
}
