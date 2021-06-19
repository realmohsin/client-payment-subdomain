import stripeForServer from '../../stripe-lib/stripe'
import bundles from '../../data/bundles'

const DOMAIN = 'http://localhost:3000/'

export default async function handler (req, res) {
  const { bundle } = req.body

  try {
    const session = await stripeForServer.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [...bundles[bundle].lineItems],
      // line_items: [
      //   {
      //     price: oneTimeFeePriceId,
      //     // For metered billing, do not pass quantity
      //     quantity: 1
      //   },
      //   {
      //     price: subscriptionPriceId,
      //     quantity: 1
      //   }
      // ],
      // {CHECKOUT_SESSION_ID} is a string literal; do not change it!
      // the actual Session ID is returned in the query parameter when your customer
      // is redirected to the success page.
      success_url: `${DOMAIN}success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${DOMAIN}canceled?bundle=${bundle}`
    })

    res.send({
      sessionId: session.id
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
