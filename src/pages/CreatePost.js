import React, { useState, useEffect } from "react";
import { addPostToDb } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';



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

  return (
    <div  className="createPostPage">
      <div className="cpContainer">
        <h1 style={{fontWeight: "600"}}>Create A Post</h1>
        <div className="inputGp">
          {/* <label> Title:</label>
           <input
            placeholder="Title..."
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />  */}
          <TextField placeholder="Enter Your Title" label="Title" variant="standard" onChange={(event) => {
              setTitle(event.target.value);
            }} 
            InputProps={{
        style: { color: '#F5F5F5' , fontWeight: "bold"}
      }}
        InputLabelProps={{
          style:{color: "#F5F5F5"}
        }} 

            />

        </div>
        <div className="inputGp">
          {/* <label> Post:</label> */}
          {/* <textarea
            placeholder="Post..."
            onChange={(event) => {
              setPostText(event.target.value);
            }}
          /> */}
          <TextField  placeholder="Write Your Post" label="Post" variant="standard"
        InputProps={{
        style: { color: '#F5F5F5' , fontWeight: "bold"}
      }}
        InputLabelProps={{
          style:{color: "#F5F5F5"}
        }} 
        onChange={(event) => {
              setPostText(event.target.value);
            }} />
        </div>
        <div className="inputImg">
          {/* <label> Image Link</label> */}
          <div className="cont">
          <TextField
          id="standard-textarea"
          label="Image Link"
          placeholder="https://"
          multiline
          variant="standard"
          onChange={hanldleImageUpload}
          InputProps={{
        style: { color: '#FFFFFF' , fontWeight: "bold"}
      }}
        InputLabelProps={{
          style:{color: "#F5F5F5", borderBottomColor: "white"}
        }} 
        />
            <img src={image} alt="Uploaded preview" />
          </div>
        </div>

        <Button style={{backgroundColor: "#FFFFFF" , color: "black"}} variant="contained"  onClick={createPost}> Submit Post </Button>
      </div>
    </div>
  );
}

export default CreatePost;
