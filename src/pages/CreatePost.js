import React, { useState, useEffect } from "react";
import { addPostToDb } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { checkLinkValidity } from "../utils/validateLink";
import { Alert } from "../components/alert/Alert";
import Modal from "./Modal"; // Import the Modal component

function CreatePost({ isAuth }) {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [image, setImage] = useState("");
  const [alert, setAlert] = useState(null)
  console.log(alert)
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
    const link = e.target.value
    checkLinkValidity(link)
      .then((validUrl) => {
        // link validation
        if (validUrl.validUrl !== null) {
          setAlert(null)
          setImage(validUrl.validUrl);
        } else {
          setAlert({ message: "Invalid image link", type: "error" });
        }
      })
      .catch((error) => {
        setAlert({ message: "Error occurred while validating image link", type: "error" });
      });
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
        <div className={image ? "inputImg active" : "inputImg"}>
          <label> Image</label>
          <div className="cont">
            {image ? null : <textarea placeholder="Paste Image Link Here" onChange={hanldleImageUpload} />}
            {alert ? <Alert {...alert} setAlert={setAlert} /> : null}
            {image && <div className="imgPreview">
              <img src={image} alt="Uploaded preview" />
              <button onClick={() => setImage(null)} className="edit-icon" title="edit" type="button"><img alt="Edit" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAABrklEQVRIS82Wi1HDMAxA2w0YoWwAG5QJgA1gA5iAMgEwAWwAG5ANYAO6AYyA3p3lU4Xj2LW5VHe6JP7o6WM7Xi5mkuVM3MXBgY8kEytRniXyKYN+wkDm3Iieiw6iT6JbbyQVMZPuKqCPMvbWQJ/l/cKAcOhMFOeieDDefnWCAjoJJOCnNnIPXkvnexhMFDte+nSFVNKMwzZSsnAfMkcGkRfRa7WRA5OeIQHzTUBfRXEawVnmas0JhD6+j7W9FQwUw5pSdYpoN6J2vbzJ92WPiD2UVLKodCcAIlK+iRbo0Ar2UK0p7R8GDgcotcWRKPukegyqNSXFbMdRKB214CkoNX2YgtaCU1A9OLCVg15JP6s9bs/SiFcyidXLE6GmNVCyUL24WqBrAbLHydbOuVASMZP1NKuJlMzYuU1gO9nX9M+PoCdYz28isVsmBe0acVhb8cHeHYP+G3gK2gxmRZJaL+zJbaLdNjUtrgnb2e69wP4iQGr1z1PqDL9LPUKz2wnD36VWK8dxCYilSV32NmarVNoeHe4PntF7NZGTph5CieLPQQ0e3IW+R6RZG7NF/AsySJwfg9EcMAAAAABJRU5ErkJggg==" /></button>
            </div>}
          </div>
        </div>

        <button className="submitBtn" onClick={createPost}> Submit Post </button>
        </div>

      {showModal && <Modal message={modalMessage} closeModal={closeModal} />}
    </div>
  );
}

export default CreatePost;
