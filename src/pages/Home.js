/* eslint-disable react-hooks/exhaustive-deps */
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Slide from "@mui/material/Slide";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, deletePostFromDb, getPostsFromDb } from "../utils/firebase";
import "./Home.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Home({ isAuth }) {
  const [postLists, setPostList] = useState([]);
  const deletePost = async (id) => {
    await deletePostFromDb(id);
    window.location.reload();
  };

  const [open, setOpen] = useState(false);
  const [DeleteConfirmed, setDeleteConfirmed] = useState(false);
  const [Blog, setBlog] = useState({});


  
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if(DeleteConfirmed){
      console.log("inside this confirm")
      deletePost(Blog.id);
    }
  },[DeleteConfirmed])

  const handleYesClick = () => {
    console.log("inside this yes")
    setDeleteConfirmed(true);
    setOpen(false);
  };
  
  const handleNoClick = () => {
    console.log("inside this No")
    setDeleteConfirmed(false)
    setOpen(false);
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


  // const DUMMY_POST = {
  //   id: `id:${Math.random()}`,
  //   title: "Dummy Post",
  //   author: { name: "Dummy Author", id: Math.random() },
  //   key: Math.random(),
  //   postText: "Hi how are you dummy man",
  //   image: "https://avatars.githubusercontent.com/in/8329?s=80&v=4",
  // };
  // postLists.push(DUMMY_POST);
  useEffect(() => {
    const getPosts = async () => {
      const data = await getPostsFromDb();
      setPostList(data);
    };
    getPosts();
  }, []);

  const navigate = useNavigate();
  const sharingHandler = (s) => {
    // console.log(`https://blogweet.vercel.app${s}`);
    navigator.clipboard.writeText(`https://blogweet.vercel.app${s}`);
    toast.success(`Your link has been pasted to your Clipboard. Enjoy!`);
  };

  const [showScrollToTop, setShowScrollToTop] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="homePage">
        {postLists.map((post) => {
          // console.log(post);
          return (
            <div className="post" key={post.id}>
              <div className="postHeader">
                <div>
                  <h1
                    className="title"
                    onClick={() => {
                      navigate(
                        `/user/${post.author.name.replaceAll(" ", "-")}/${
                          post.id
                        }`,
                        { state: post }
                      );
                    }}
                  >
                    {" "}
                    {post.title}
                  </h1>
                  {/* </Link> */}
                </div>

                <div className="deletePost">
                  {isAuth &&
                    auth.currentUser != null &&
                    post.author.id === auth.currentUser.uid && (
                      <button
                        
                        onClick={() => {
                          setOpen(true);
                          setBlog(post)
                        }}
                      >
                        <i
                          className="bx bxs-message-square-x"
                          style={{ color: "#600505" }}
                        ></i>
                      </button>
                    )}

                  <button
                    className="expandElement"
                    onClick={() =>
                      sharingHandler(
                        `/user/${post.author.name.replaceAll(" ", "-")}/${
                          post.id
                        }`
                      )
                    }
                  >
                    <i className="bx bxs-share-alt"></i>
                  </button>
                </div>
              </div>
              <div className="contents">
                <div className="imageCont">
                  <img src={post.image} alt={post.title} />
                </div>
                <div className="postTextContainer">
                  <div style={{ height: "70px", overflow: "hidden" }}>
                    {post.postText.substr(
                      0,
                      Math.min(post.postText.length, 200)
                    )}
                    &nbsp;&nbsp;{" "}
                  </div>
                  <div
                    style={{
                      textAlign: "right",
                      color: "#3a363d",
                      fontSize: ".9rem",
                      cursor: "pointer",
                      width: "fit-content",
                      "justify-self": "end",
                    }}
                    onClick={() => {
                      navigate(
                        `/user/${post.author.name.replaceAll(" ", "-")}/${
                          post.id
                        }`,
                        { state: post }
                      );
                    }}
                  >
                    ......Read More
                  </div>
                </div>
              </div>
              <h3>
                <div>📅{post.date}</div>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate(`/user/${post.author.name.replaceAll(" ", "-")}`, {
                      state: post.author,
                    });
                  }}
                >
                  👤{post.author.name}
                </div>
              </h3>
            </div>
          );
        })}
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {/* Scroll-to-top button */}
      {showScrollToTop && (
        <button
          className="scrollToTopBtn"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          title="Scroll to top"
        >
          <div className="scrollElement">
            <FontAwesomeIcon icon={faArrowUp} />
          </div>
        </button>
      )}
      <Dialog
      fullScreen={fullScreen}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        style={{width: "600px", margin: "auto"}}
      >
        <DialogTitle>{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to permanently delete this item? This process
            can be undone!
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
            onClick={handleYesClick}
          >
            Yes
          </Button>
          <Button
            style={{
              padding: "5px",
              backgroundColor: "#2577ea",
              color: "white",
              textTransform: "capitalize",
            }}
            onClick={handleNoClick}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Home;
