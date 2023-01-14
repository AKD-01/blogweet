import React, { useState, useEffect } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";

function CreatePost({ isAuth }) {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [image, setImage] = useState("");

  const postsCollectionRef = collection(db, "posts");
  let navigate = useNavigate();

  const createPost = async () => {
    //function adds the document to the database.
    await addDoc(postsCollectionRef, {
      title, //title: title
      postText,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
      date: new Date().toJSON().slice(0, 10).replace(/-/g, "/"),
      image
    });
    navigate("/");
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

  const hanldleImageUpload =(e) =>{
    setImage(e.target.value)
  }

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
          />
        </div>
        <div className="inputGp">
          <label> Post:</label>
          <textarea
            placeholder="Post..."
            onChange={(event) => {
              setPostText(event.target.value);
            }}
          />
        </div>
        <div className="inputImg">
          <label> Image Link</label>
          <div className="cont">
            <input placeholder="https://" onChange={hanldleImageUpload} />
            <img src={image} alt="Uploaded Image preview" />
          </div>
        </div>

        <button onClick={createPost}> Submit Post </button>
      </div>
    </div>
  );
}

export default CreatePost;
