import React, { useState, useEffect } from "react";
import { addPostToDb } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal"; // Import the Modal component

function CreatePost({ isAuth }) {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [image, setImage] = useState("");
  const [modalMessage, setModalMessage] = useState(""); // State for the modal message
  const [showModal, setShowModal] = useState(false); // State to control the modal visibility
  let navigate = useNavigate();

  function isImage(url) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  }
  

  const createPost = async () => {
    if(!isImage(image)) alert("is not a valid image");
  
    if (!title || !postText || !image || !isImage(image)) {
      setModalMessage("Please fill all the fields"); // Set the modal message
      setShowModal(true); // Show the modal
      return;
    }
    console.log(title, postText, image);
    if (getWordCount(postText) < 20) {
      setModalMessage("The post must contain at least 20 words."); // Set the modal message
      setShowModal(true); // Show the modal
      return;
    }
    await addPostToDb(title, postText, image);
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

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Create A Post</h1>
        <div className="inputGp">
          <label>Title :</label>
          <input
            placeholder="Enter the Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="inputGp">
          <label> Post :</label>
          <textarea
            placeholder="Write your Post"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />
        </div>
        <div className="inputGp w-75">
          <label>Image Link :</label>
          <input
            placeholder="https://"
            value={image}
            onChange={hanldleImageUpload}
          />
        </div>
          { image !== "" &&
            <img src={image} className="preview" alt="Link Broken not an image" />
          }

        <button onClick={createPost}> Submit Post </button>
      </div>

      {showModal && <Modal message={modalMessage} closeModal={closeModal} />}
    </div>
  );
}

export default CreatePost;
