import * as firebase from 'firebase'

import flamelink from 'flamelink'

const FirebaseConfig = {
  apiKey: 'AIzaSyCtyAoKcHtDmfzoJ8mvGTQA1-Bg_ClkW30',
  authDomain: 'iceland-book.firebaseapp.com',
  databaseURL: 'https://iceland-book.firebaseio.com',
  projectId: 'iceland-book',
  storageBucket: 'iceland-book.appspot.com',
  messagingSenderId: '831130240467'
}

const firebaseApp = firebase.initializeApp(FirebaseConfig)

const app = flamelink({ firebaseApp })

export { firebaseApp }

export default app
