import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";

function CreatePost({ isAuth }) {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [image, setImage] = useState("");

  const postsCollectionRef = collection(db, "posts");
  let navigate = useNavigate();

  const createPost = async () => {

    //make post and title area mandatory
    if (!title || !postText) {
      alert("Please fill in all required fields.");
      return;
    }

    //function to add atleast 100 words in blog post
    if (getWordCount(postText) < 30) {
      alert("The post must contain at least 30 words.");
      return;
    }
    //function adds the document to the database.
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
    navigate("/");
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hanldleImageUpload = (e) => {
    setImage(e.target.value);
  };

  const getWordCount = (text) => {
    return text.trim().split(/\s+/).length;
  };

  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Create A Post</h1>
        <div className="inputGp">
          <label> Title:</label>
          <input
            placeholder="Title..."
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            required
          />
        </div>
        <div className="inputGp">
          <label> Post:</label>
          <textarea
            placeholder="Post..."
            onChange={(event) => {
              setPostText(event.target.value);
            }}
            required
          />
        </div>
        <div className="inputImg">
          <label> Image Link</label>
          <div className="cont">
            <input placeholder="https://" onChange={hanldleImageUpload} />
            <img src={image} alt="Uploaded preview" />
          </div>
        </div>

        <button onClick={createPost}> Submit Post </button>
      </div>
    </div>
  );
}

export default CreatePost;
