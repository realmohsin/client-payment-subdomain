export default {
  wordpress1: {
    lineItems: [
      {
        price: process.env.ONE_TIME_FEE_PRICE_ID,
        // For metered billing, do not pass quantity
        quantity: 1
      },
      {
        price: process.env.BASIC_SUBSCRIPTION_PRICE_ID,
        quantity: 1
      }
    ]
  }
}
