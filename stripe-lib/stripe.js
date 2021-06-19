const stripeForServer = require('stripe')(process.env.STRIPE_SK_KEY)

export default stripeForServer
