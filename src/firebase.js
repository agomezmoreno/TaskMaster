import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'
// ... other firebase imports

export const firebaseApp = initializeApp({
  // your application settings
  apiKey: "AIzaSyB8rdIXAQzBg2T8Z4RhR9JQpwAgagpYDDU",
  authDomain: "recordatorios-83f42.firebaseapp.com",
  projectId: "recordatorios-83f42",
  storageBucket: "recordatorios-83f42.firebasestorage.app",
  messagingSenderId: "551298230417",
  appId: "1:551298230417:web:d460b05d639db6e6b5f730",
  measurementId: "G-3L8MHETZEY"
})

// used for the firestore refs
const db = getFirestore(firebaseApp)


