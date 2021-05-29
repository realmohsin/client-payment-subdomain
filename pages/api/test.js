import db from '../../firebase-lib/db-setup'

export default async function handler (req, res) {
  console.log('endpoint reached')
  try {
    const usersRef = db.collection('users')
    const snapshot = await usersRef.where('first', '==', 'Ada').get()

    const doc = snapshot.docs[0]
    const docRef = doc.ref
    await docRef.update({ first: 'AdaChanged' })

    res.send({
      message: 'successful'
    })
  } catch (error) {
    console.error('Error adding document: ', error)
    res.status(400).send({
      message: 'error happened'
    })
  }
}
