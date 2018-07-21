import Firebase from 'firebase/app'
import 'firebase/firestore'

const FirebaseApp = Firebase.initializeApp({
  apiKey: 'AIzaSyCtyAoKcHtDmfzoJ8mvGTQA1-Bg_ClkW30',
  authDomain: 'iceland-book.firebaseapp.com',
  databaseURL: 'https://iceland-book.firebaseio.com',
  projectId: 'iceland-book',
  storageBucket: 'iceland-book.appspot.com',
  messagingSenderId: '831130240467'
})

const firestore = Firebase.firestore()
const settings = {timestampsInSnapshots: true}
firestore.settings(settings)

export const db = FirebaseApp.firestore()
