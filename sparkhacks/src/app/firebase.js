import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyByfyyT-w_N0aWH4CB1UZSZN3UA9f2nJXg",
  authDomain: "farmer-database-8c8d8.firebaseapp.com",
  projectId: "farmer-database-8c8d8",
  storageBucket: "farmer-database-8c8d8.firebasestorage.app",
  messagingSenderId: "104919951350",
  appId: "1:104919951350:web:93681a42edf41126b4c9d7",
  measurementId: "G-DPT736QNM0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// const firestore = getFirestore();

export { db };
