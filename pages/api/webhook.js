import stripe from '../../stripe-lib/stripe'
import {
  addNewClientToDb,
  updateDbWhenInvoicePaid,
  updateDbWhenPaymentFailed
} from '../../firebase-lib/db-functions'
import {
  sendEmailsAfterCheckout,
  sendEmailsAfterPaymentFailed
} from '../../sendgrid-lib/sendgrid-functions'

const DOMAIN = 'http://localhost:3000/'

export default async function handler (req, res) {
  let data
  let eventType
  // Check if webhook signing is configured.
  const webhookSecret = ''
  if (webhookSecret) {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event
    let signature = req.headers['stripe-signature']

    try {
      event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret)
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`)
      return res.status(400).send('ERROR')
    }
    // Extract the object from the event.
    data = event.data
    eventType = event.type
  } else {
    // Webhook signing is recommended, but if the secret is not configured in `config.js`,
    // retrieve the event data directly from the request body.
    data = req.body.data
    eventType = req.body.type
  }

  let customerStripeId
  let customerEmail

  switch (eventType) {
    case 'checkout.session.completed':
      console.log('checkout.session.completed event received')

      customerStripeId = data.object.customer
      customerEmail = data.object.customer_details.email

      // Add new user to database
      try {
        await addNewClientToDb(customerStripeId, customerEmail)
      } catch (error) {
        console.error('Error adding document: ', error)
        return res.status(400).send('Error adding to DB')
      }

      // Send email
      try {
        await sendEmailsAfterCheckout(customerEmail)
      } catch (error) {
        console.error(`Error sending email: ${error}`)
        return res.status(400).send('Error sending emails')
      }

      break

    case 'invoice.paid':
      // Store the status in your database and check when a user accesses your service.
      // This approach helps you avoid hitting rate limits.
      console.log('invoice.paid event received')

      customerStripeId = data.object.customer

      // update with paymentProblem: false
      try {
        await updateDbWhenInvoicePaid(customerStripeId)
      } catch (error) {
        console.error(`Error updating document: ${error}`)
        return res.status(400).send('Error updating db.')
      }

      break

    case 'invoice.payment_failed':
      // The subscription becomes past_due. Notify your customer and send them to the
      // customer portal to update their payment information.
      console.log('Invoice payment failed webhook received.')

      customerStripeId = data.object.customer
      customerEmail = data.object.customer_email

      // update db about payment failure
      try {
        await updateDbWhenPaymentFailed(customerStripeId)
      } catch (error) {
        console.error(`Error updating document: ${error}`)
        return res.status(400).send('Error updating db.')
      }

      // send emails
      try {
        await sendEmailsAfterPaymentFailed(customerEmail)
      } catch (error) {
        console.error(`Error sending email: ${error}`)
        return res.status(400).send('Error sending emails')
      }

      break
    default:
    // Unhandled event type
  }

  res.status(200).send('OK')
}
