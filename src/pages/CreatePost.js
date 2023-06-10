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

  const createPost = async () => {
    if (!title || !postText || !image) {
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
            <input placeholder="https://" onChange={hanldleImageUpload} />
            <img src={image} alt="Uploaded preview" />
          </div>
        </div>

        <button onClick={createPost}> Submit Post </button>
      </div>

      {showModal && <Modal message={modalMessage} closeModal={closeModal} />}
    </div>
  );
}

export default CreatePost;
