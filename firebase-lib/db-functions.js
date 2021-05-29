import db from './db-setup'

const addNewClientToDb = async (customerStripeId, customerEmail) => {
  const docRef = await db.collection('clients').add({
    customerStripeId,
    email: customerEmail,
    name: '',
    paymentProblem: false
  })
  console.log('Document written with ID: ', docRef.id)
}

const updateDbWhenInvoicePaid = async (customerStripeId, customerName) => {
  const clientsRef = db.collection('clients')
  const snapshot = await clientsRef
    .where('customerStripeId', '==', customerStripeId)
    .get()
  const doc = snapshot.docs[0]
  const docRef = doc.ref
  await docRef.update({ name: customerName, paymentProblem: false })
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

export { addNewClientToDb, updateDbWhenInvoicePaid, updateDbWhenPaymentFailed }
