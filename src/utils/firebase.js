// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "./a.env.local";
import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
// REACT_APP_API_KEY="AIzaSyD9tMXwqU7ijIKnQu0vsX1UoR9FM_w7r2E"
// REACT_APP_AUTH_DOMAIN="blog-5814a.firebaseapp.com"
// REACT_APP_PROJECT_ID="blog-5814a"
// REACT_APP_STORAGE_BUCKET="blog-5814a.appspot.com"
// REACT_APP_MESSAGE_SENDER_ID="787500061298"
// REACT_APP_APP_ID="1:787500061298:web:242f526d6800f0bbbf68eb"
// GENERATE_SOURCEMAP=false,
  apiKey:"AIzaSyD9tMXwqU7ijIKnQu0vsX1UoR9FM_w7r2E",
  authDomain:"blog-5814a.firebaseapp.com",
  projectId: "blog-5814a",
  storageBucket:"blog-5814a.appspot.com",
  messagingSenderId: "787500061298",
  appId: "1:787500061298:web:242f526d6800f0bbbf68eb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

// Sign in and sign out functions
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGithubPopup = () =>
  signInWithPopup(auth, githubProvider);
export const signUserAccountOut = () => signOut(auth);

const postsCollectionRef = collection(db, "posts");
// Add post to firestore database
export const addPostToDb = async (title, postText, image) => {
  await addDoc(postsCollectionRef, {
    title, //title: title
    postText,
    author: {
      name: auth.currentUser.displayName,
      id: auth.currentUser.uid,
      email: auth.currentUser.email,
      photoUrl: auth.currentUser.photoURL,
    },
    date: new Date().toJSON().slice(0, 10).replace(/-/g, "/"),
    image,
  });
};

// Get posts from firestore database
export const getPostsFromDb = async () => {
  const data = await getDocs(postsCollectionRef);
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

// Delete post from firestore database
export const deletePostFromDb = async (id) =>
  await deleteDoc(doc(db, "posts", id));
