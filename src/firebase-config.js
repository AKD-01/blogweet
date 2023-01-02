// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCF1nWit7RG2-5RFP4a9wcBzxX9u4xUuYg",
  authDomain: "blogweet-64b24.firebaseapp.com",
  projectId: "blogweet-64b24",
  storageBucket: "blogweet-64b24.appspot.com",
  messagingSenderId: "1019234338311",
  appId: "1:1019234338311:web:b14d1e120fb1da570dcca2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();