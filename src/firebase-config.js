// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: "AIzaSyBSN0SLpQmEBJtxlDJENf4syWXPQRRqhN0",
  // authDomain: "blogweet-c28a4.firebaseapp.com",
  // projectId: "blogweet-c28a4",
  // storageBucket: "blogweet-c28a4.appspot.com",
  // messagingSenderId: "801793825021",
  // appId: "1:801793825021:web:8b905f78556131e4c94694"

  // apiKey: "AIzaSyD9tMXwqU7ijIKnQu0vsX1UoR9FM_w7r2E",
  // authDomain: "blog-5814a.firebaseapp.com",
  // projectId: "blog-5814a",
  // storageBucket: "blog-5814a.appspot.com",
  // messagingSenderId: "787500061298",
  // appId: "1:787500061298:web:242f526d6800f0bbbf68eb",

  apiKey: "AIzaSyC5bxhpw-DzJF-1dtVQsdA5u7AaRUxQ-7g",
  authDomain: "blog-divine.firebaseapp.com",
  projectId: "blog-divine",
  storageBucket: "blog-divine.appspot.com",
  messagingSenderId: "610968567774",
  appId: "1:610968567774:web:84d7f5a01962489992a74f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
