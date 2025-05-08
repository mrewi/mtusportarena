// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  // Import Firestore
import { getAuth } from "firebase/auth";            // Import Firebase Authentication

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZtYy7KMDyTDG553N88ZN5HJcecLh0HAo",
  authDomain: "mtusportsarena.firebaseapp.com",
  projectId: "mtusportsarena",
  storageBucket: "mtusportsarena.firebasestorage.app",
  messagingSenderId: "192265234723",
  appId: "1:192265234723:web:a78d4498f1650f3f610496",
  measurementId: "G-7LV5ZCFFKF"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);  // Create a Firestore instance

// Initialize Firebase Auth
const auth = getAuth(app);  // Create an auth instance

// Export Firestore and Auth instances for use in other parts of the app
export { db, auth };
