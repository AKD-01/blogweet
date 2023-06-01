import React, { useState, useEffect } from "react";
import { addPostToDb } from "../utils/firebase";
import { useNavigate } from "react-router-dom";

function CreatePost({ isAuth }) {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [image, setImage] = useState("");

 
  let navigate = useNavigate();

  const createPost = async () => {
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
  function changeBackground(e) {
    e.target.style.background = '	#FF6347';
  }
  function changecolor(e) {
    e.target.style.background = 'white';
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
            <img src={image} alt="Uploaded preview" />
          </div>
        </div>

        <button onClick={createPost} onMouseOver={changeBackground} onMouseLeave = {changecolor}> Submit Post </button>
      </div>
    </div>
  );
}

export default CreatePost;
