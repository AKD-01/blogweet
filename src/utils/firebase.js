// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup, signOut } from "firebase/auth";

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
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

// Sign in and sign out functions
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGithubPopup = () => signInWithPopup(auth, githubProvider);
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
}

// Get posts from firestore database
export const getPostsFromDb = async () => {
  const data = await getDocs(postsCollectionRef);
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}

// Delete post from firestore database
export const deletePostFromDb = async (id) => await deleteDoc(doc(db, "posts", id));


export const submitFormData = (formData) => {
  // const newFormDataRef = database.ref('form-data').push();
  // newFormDataRef.set(formData);
  console.log(formData);
};