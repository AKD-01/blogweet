import React, { useState, useEffect } from "react";
import { addPostToDb } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

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
    <Box
      margin={"2em"}
      width={"100%"}
      display={"flex"}
      justifyContent={"center"}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        width={"70%"}
        bgcolor={"#ffffff"}
        sx={{ boxShadow: 3, borderRadius: "12px" }}
        marginLeft={"13em"}
      >
        <Typography variant="h1">Create a Post</Typography>

        <Box sx={{ margin: "20px", width: 500, maxWidth: "100%" }}>
          <TextField
            fullWidth
            id="standard-basic"
            label="Title"
            variant="standard"
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </Box>
        <Box
          sx={{
            margin: "20px",
            marginTop: "0",
            width: 500,
            maxWidth: "100%",
          }}
        >
          <TextField
            multiline
            rows={5}
            fullWidth
            id="standard-basic"
            label="Post"
            variant="standard"
            onChange={(event) => {
              setPostText(event.target.value);
            }}
          />
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          sx={{
            margin: "20px",
            marginTop: "0",
            width: 500,
            maxWidth: "100%",
          }}
        >
          <TextField
            id="standard-basic"
            label="Image Link"
            variant="outlined"
            onChange={hanldleImageUpload}
          />
          <Box padding={"20px"} sx={{ boxShadow: 1 }}>
            <img src={image} alt="Uploaded preview" />
          </Box>
        </Box>
        <Box
          marginBottom={"20px"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Button
            onClick={createPost}
            variant="contained"
            endIcon={<AddCircleIcon />}
          >
            Create
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default CreatePost;
