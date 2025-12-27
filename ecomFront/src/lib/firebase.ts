// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
//  Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKTyoitAc5hL5QHVtFQsZ5GKjDnox-8p4",
  authDomain: "ecom-template-6777b.firebaseapp.com",
  projectId: "ecom-template-6777b",
  storageBucket: "ecom-template-6777b.firebasestorage.app",
  messagingSenderId: "47381979458",
  appId: "1:47381979458:web:65180a15792e16e49368db",
  measurementId: "G-8ZPQXCXC53"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);