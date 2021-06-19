// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from 'firebase/app'

// Add the Firebase products that you want to use
import 'firebase/auth'
import 'firebase/firestore'

// not a security risk to expose these, only identifies your project with Google's servers
const firebaseConfig = {
  apiKey: 'AIzaSyBiTJdaDOTq7oqUJ40nVahrnUTuz8ERtPA',
  authDomain: 'client-payment-subdomain.firebaseapp.com',
  projectId: 'client-payment-subdomain',
  storageBucket: 'client-payment-subdomain.appspot.com',
  messagingSenderId: '1027259553451',
  appId: '1:1027259553451:web:28736cd4a92a84200789ee'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

export default db
