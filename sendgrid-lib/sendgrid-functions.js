import sgMail from './sendgrid-setup'

const sendEmailsAfterCheckout = async customerEmail => {
  const msgToMe = {
    to: 'payments.realmohsin@gmail.com', // Change to your recipient
    from: 'real@realmohsin.com', // Change to your verified sender
    subject: 'Checkout Session Completed By A Client',
    text: 'expect invoice.paid email soon',
    html: '<strong>strong html</strong>'
  }
  const msgToClient = {
    to: customerEmail, // Change to your recipient
    from: 'real@realmohsin.com', // Change to your verified sender
    subject: 'Web Development Service - Real Mohsin',
    text:
      'Your checkout was complete. If everything went successfully you should be good to go.',
    html: '<strong>strong html</strong>'
  }
  await sgMail.send(msgToMe)
  await sgMail.send(msgToClient)
  // await sgMail.send(msgToClient)
  console.log(`Emails sent for checkout completed`)
}

const sendEmailsAfterPaymentFailed = async customerEmail => {
  const msgToMe = {
    to: 'payments.realmohsin@gmail.com', // Change to your recipient
    from: 'real@realmohsin.com', // Change to your verified sender
    subject: 'An Invoice Payment Has Failed',
    text: 'A customers invoice payment has failed',
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

const sendEmailsAfterSubCanceled = async (customerStripeId, customerEmail) => {
  const msgToMe = {
    to: 'payments.realmohsin@gmail.com', // Change to your recipient
    from: 'real@realmohsin.com', // Change to your verified sender
    subject: 'A subscription was canceled',
    text: `Customer with id ${customerStripeId} canceled their subscription`,
    html: '<strong>strong html</strong>'
  }
  const msgToClient = {
    to: customerEmail, // Change to your recipient
    from: 'real@realmohsin.com', // Change to your verified sender
    subject: 'Web Development Service - Sorry to see you go',
    text:
      'If you require our services again later, feel free to contact us again.',
    html: '<strong>strong html</strong>'
  }
  await sgMail.send(msgToMe)
  await sgMail.send(msgToClient)
  console.log(`Emails sent for subscription cancelation.`)
}

export {
  sendEmailsAfterCheckout,
  sendEmailsAfterPaymentFailed,
  sendEmailsAfterSubCanceled
}
