import React, { useState, useEffect } from "react";
import { addPostToDb } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CreatePost({ isAuth }) {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [image, setImage] = useState("");

 
  let navigate = useNavigate();

  const createPost = async () => {
<<<<<<< HEAD
    //function adds the document to the database.
    const postDataCopy= {
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
    }
    const postByAuthor= await addDoc(postsCollectionRef, postDataCopy);
    //`/${postDataCopy.author.name}/${postByAuthor.id}`
    navigate(`/${postDataCopy.author.name}/${postByAuthor.id}`);
    toast.success('Your Post has been published!')
=======
    if(!title || !postText || !image) {
      alert("Please fill all the fields");
      return;
    }
    console.log(title, postText, image);
    if (getWordCount(postText) < 20) {
      alert("The post must contain at least 20 words.");
      return;
    } 
    await addPostToDb(title, postText, image);
    navigate("/");
>>>>>>> 4b78d19dc4150835dde028bd09b2c44440b29b33
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="inputGp">
          <label> Post:</label>
          <textarea
            placeholder="Post..."
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />
        </div>
        <div className="inputImg">
          <label> Image Link</label>
          <div className="cont">
            <input placeholder="https://"  onChange={hanldleImageUpload} />
            <img src={image} alt="Uploaded preview" />
          </div>
        </div>

        <button  onClick={createPost}> Submit Post </button>
      </div>
    </div>
  );
}

export default CreatePost;
