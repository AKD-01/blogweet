import React, { useState, useEffect } from "react";
import { addPostToDb } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Slide from "@mui/material/Slide";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function CreatePost({ isAuth }) {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [image, setImage] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setmessage] = useState({});

  
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

 
  let navigate = useNavigate();

  const createPost = async () => {
    if(!title || !postText || !image) {
      setmessage( {"status" : "Please fill all the fields"})
      setOpen(true);
      return;
    }
    console.log(title, postText, image);
    if (getWordCount(postText) < 20) {
      setmessage( {"status" : "The post must contain at least 20 words."})
      setOpen(true);
      return;
    } 
    await addPostToDb(title, postText, image);
    navigate("/");
  };

  const handleClick = () => {
    setOpen(false);
  }
  const handleClose = () => {
    setOpen(false);
  }

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
      <Dialog
      PaperProps={{ sx: { position: "fixed"} }}
      fullScreen={fullScreen}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        style={{width: "50%", margin: "auto"}}
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {message.status}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            style={{
              padding: "5px",
              backgroundColor: "#2577ea",
              color: "white",
              textTransform: "capitalize",
            }}
            onClick={handleClick}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreatePost;
