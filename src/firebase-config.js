// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBSN0SLpQmEBJtxlDJENf4syWXPQRRqhN0",
  authDomain: "blogweet-c28a4.firebaseapp.com",
  projectId: "blogweet-c28a4",
  storageBucket: "blogweet-c28a4.appspot.com",
  messagingSenderId: "801793825021",
  appId: "1:801793825021:web:8b905f78556131e4c94694",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();