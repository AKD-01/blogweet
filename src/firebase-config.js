// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyAUCjUbbyTizfjCAHNhln1IGSNI9VZA96M",
  authDomain: "blogweet-c4a25.firebaseapp.com",
  projectId: "blogweet-c4a25",
  storageBucket: "blogweet-c4a25.appspot.com",
  messagingSenderId: "540307509115",
  appId: "1:540307509115:web:88717efc9a6d8226caf7de"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();