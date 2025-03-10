// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "loggen-2018e.firebaseapp.com",
  projectId: "loggen-2018e",
  storageBucket: "loggen-2018e.firebasestorage.app",
  messagingSenderId: "912267109533",
  appId: "1:912267109533:web:0f2a846d8b2640a7556074",
  measurementId: "G-ZDQZTKDDKS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);