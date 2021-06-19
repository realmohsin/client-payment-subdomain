import db from './db-setup'

const checkIsClientInDb = async customerStripeId => {
  const clientsRef = db.collection('clients')
  const snapshot = await clientsRef
    .where('customerStripeId', '==', customerStripeId)
    .get()

  return !snapshot.empty
}

const addNewClientToDb = async (
  customerStripeId,
  customerEmail,
  isSubscription
) => {
  const clientsRef = db.collection('clients')
  const snapshot = await clientsRef
    .where('customerStripeId', '==', customerStripeId)
    .get()

  // since stripe resends event if non 200 OK message is sent, we add this so client is not added twice, or rewritten
  if (snapshot.empty) {
    const docRef = await clientsRef.add({
      customerStripeId,
      email: customerEmail,
      paymentProblem: false,
      isSubscription,
      subscriptionStatus: isSubscription ? 'active' : 'none' // can be active, canceled or none
    })
    console.log('Document written with ID: ', docRef.id)
    return
  }
}

const updateDbWhenInvoicePaid = async customerStripeId => {
  const clientsRef = db.collection('clients')
  const snapshot = await clientsRef
    .where('customerStripeId', '==', customerStripeId)
    .get()

  // since first invoice.paid is sent simultaneously with checkout.session.completed snapshot will be empty
  // this update is mainly for setting paymentProblem back to false if it is ever set to true from payment failure
  if (snapshot.empty) {
    return
  }

  const doc = snapshot.docs[0]
  const docRef = doc.ref
  await docRef.update({ paymentProblem: false })
  console.log('Document updated with customer name after invoice paid')
}

const updateDbWhenPaymentFailed = async customerStripeId => {
  const clientsRef = db.collection('clients')
  const snapshot = await clientsRef
    .where('customerStripeId', '==', customerStripeId)
    .get()
  const doc = snapshot.docs[0]
  const docRef = doc.ref
  await docRef.update({ paymentProblem: true })
  console.log(
    'Document updated with paymentProblem after invoice payment failed'
  )
}

const updateDbWhenSubCanceled = async customerStripeId => {
  const clientsRef = db.collection('clients')
  const snapshot = await clientsRef
    .where('customerStripeId', '==', customerStripeId)
    .get()
  const doc = snapshot.docs[0]
  const docRef = doc.ref
  await docRef.update({ subscriptionStatus: 'canceled' })
  console.log('Document updated with subscriptionStatus as canceled')
}

export {
  checkIsClientInDb,
  addNewClientToDb,
  updateDbWhenInvoicePaid,
  updateDbWhenPaymentFailed,
  updateDbWhenSubCanceled
}
