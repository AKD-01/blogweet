import React, { useState, useEffect } from "react";
import { addPostToDb } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
function CreatePost({ isAuth }) {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [image, setImage] = useState("");

  const { quill, quillRef } = useQuill();

  let navigate = useNavigate();

  const createPost = async () => {
    if (!title || !postText || !image) {
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
  React.useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        console.log(quillRef.current.firstChild.innerHTML);
        setPostText(quillRef.current.firstChild.innerHTML);
      });
    }
  }, [quill]);
  console.log(postText, "this is quill text");

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
        {/* <div className="inputGp">
          <label> Post:</label>
          <textarea
            placeholder="Post..."
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />
        </div> */}
        <div className="inputGp" style={{ width: "100%" }}>
          <div
            style={{ minHeight: "100px"}}
            ref={quillRef}
            placeholder="Enter the post to continue..."
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
    </div>
  );
}

export default CreatePost;
