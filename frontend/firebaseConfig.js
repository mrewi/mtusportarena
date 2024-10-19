// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  // Import Firestore
import { getAuth } from "firebase/auth";            // Import Firebase Authentication

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjrRO7WLaeY648UuEh0BaBDs134akpIp0",
  authDomain: "mtusportarena-41ae6.firebaseapp.com",
  projectId: "mtusportarena-41ae6",
  storageBucket: "mtusportarena-41ae6.appspot.com",
  messagingSenderId: "718759514214",
  appId: "1:718759514214:web:5338ba7c0b4405f730dda7",
  measurementId: "G-95CRC65YE5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);  // Create a Firestore instance

// Initialize Firebase Auth
const auth = getAuth(app);  // Create an auth instance

// Export Firestore and Auth instances for use in other parts of the app
export { db, auth };
