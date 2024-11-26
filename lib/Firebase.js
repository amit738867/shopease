import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDbyTRXMp7c5Stg59Tq6CB9RgSjBCUm7ck",
  authDomain: "shopease-cec7f.firebaseapp.com",
  databaseURL: "https://shopease-cec7f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "shopease-cec7f",
  storageBucket: "shopease-cec7f.appspot.com",
  messagingSenderId: "78273008879",
  appId: "1:78273008879:web:72e4c7022a0332d1ad371a",
  measurementId: "G-YDP1GCEDC8"
};

// Initialize Firebase only if no app is already initialized
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const firedb = getFirestore(app);
