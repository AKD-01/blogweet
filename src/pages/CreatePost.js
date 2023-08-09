import React, { useState, useEffect, useRef,useMemo } from "react";
import { addPostToDb } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import "jodit";
import "jodit/build/jodit.min.css";
import JoditEditor from "jodit-react";
import "./CreatePost.css"; // Import your custom CSS file

function CreatePost({ isAuth }) {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploadedImage, setUploadedImage] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const editorRef = useRef(null);
  let navigate = useNavigate();

  const config = useMemo(
    () => ({
        readonly: false, 
    }),
    []
);

  const createPost = async () => {
    if (!title || !postText || (!imageUrl && !uploadedImage)) {
      setModalMessage("Please fill all the fields");
      setShowModal(true);
      return;
    }
    console.log(title, postText, imageUrl || uploadedImage);
    if (getWordCount(postText) < 20) {
      setModalMessage("The post must contain at least 20 words.");
      setShowModal(true);
      return;
    }
    await addPostToDb(title, postText, imageUrl || uploadedImage);
    navigate("/");
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
        setImageUrl("");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrlChange = (e) => {
    setUploadedImage("");
    setImageUrl(e.target.value);
  };

  const fetchImageUrl = async () => {
    try {
      const response = await fetch(imageUrl);
      if (response.ok) {
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          setUploadedImage(reader.result);
        };
        reader.readAsDataURL(blob);
      } else {
        setModalMessage("Failed to fetch the image from the provided URL");
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error fetching image URL:", error);
      setModalMessage("Failed to fetch the image from the provided URL");
      setShowModal(true);
    }
  };

  const getWordCount = (text) => {
    return text.trim().split(/\s+/).length;
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleEditorChange = (value) => {
    setPostText(value);
  };

  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Create A Post</h1>
        <div className="inputGp mt">
          <label>Title:</label>
          <input
            placeholder="Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="inputGp">
          <label>Post:</label>
          <div className="jodit-editor-container">
            <JoditEditor
              ref={editorRef}
              value={postText}
              onChange={handleEditorChange}
              config={config}
            />
          </div>
        </div>
        <div className="inputImg">
          <label>Image Upload:</label>
          <div className="cont">
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {uploadedImage && <img src={uploadedImage} alt="Uploaded preview" />}
          </div>
        </div>
        <div className="inputGp">
          <label>Image URL:</label>
          <input
            placeholder="Image URL..."
            value={imageUrl}
            onChange={handleImageUrlChange}
          />
          {imageUrl && <button onClick={fetchImageUrl}>Fetch Image</button>}
        </div>

        <button onClick={createPost}>Submit Post</button>
      </div>

      {showModal && <Modal message={modalMessage} closeModal={closeModal} />}
    </div>
  );
}

export default CreatePost;
