import sgMail from './sendgrid-setup'

const sendEmailsAfterCheckout = async customerEmail => {
  const msgToMe = {
    to: 'payments.realmohsin@gmail.com', // Change to your recipient
    from: 'real@realmohsin.com', // Change to your verified sender
    subject: 'Checkout Session Completed By A Client',
    text: 'text here',
    html: '<strong>strong html</strong>'
  }
  const msgToClient = {
    to: customerEmail, // Change to your recipient
    from: 'real@realmohsin.com', // Change to your verified sender
    subject: 'Web Development Service - Real Mohsin',
    text:
      'Your payment was successfully paid. If you have any questions or concerns contact me at ...',
    html: '<strong>strong html</strong>'
  }
  await sgMail.send(msgToMe)
  await sgMail.send(msgToClient)
  console.log(`Emails sent for checkout completed`)
}

const sendEmailsAfterPaymentFailed = async customerEmail => {
  const msgToMe = {
    to: 'payments.realmohsin@gmail.com', // Change to your recipient
    from: 'real@realmohsin.com', // Change to your verified sender
    subject: 'An Invoice Payment Has Failed',
    text: 'Invoice payment has failed',
    html: '<strong>strong html</strong>'
  }
  const msgToClient = {
    to: customerEmail, // Change to your recipient
    from: 'real@realmohsin.com', // Change to your verified sender
    subject: 'Web Development Service - Your latest payment has failed',
    text:
      'Your latest payment has failed. Either update your payment information or cancel your subscription here.',
    html: '<strong>strong html</strong>'
  }
  await sgMail.send(msgToMe)
  await sgMail.send(msgToClient)
  console.log(`Emails sent for payment failure`)
}

export { sendEmailsAfterCheckout, sendEmailsAfterPaymentFailed }
