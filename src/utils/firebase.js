// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
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

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyCaEnLB9i1AjNkoR3jj0BhoKJ4TZWDikzI",
  authDomain: "animating-buttons-5ae2b.firebaseapp.com",
  projectId: "animating-buttons-5ae2b",
  storageBucket: "animating-buttons-5ae2b.appspot.com",
  messagingSenderId: "328113147529",
  appId: "1:328113147529:web:517d447a8a83f581ee0058",
  measurementId: "G-WHKWF2ZSFD"
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
