/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { getPostsFromDb, deletePostFromDb } from "../utils/firebase";
import { auth, db } from "../utils/firebase";

import "./Home.css";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";

function Home({ isAuth }) {
  const [postLists, setPostList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const deletePost = async (id) => {
    await deletePostFromDb(id);
    window.location.reload();
  };

  const openEditModal = (post) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  const closeEditModal = () => {
    setShowModal(false);
  };

  const handleModalSubmit = async () => {
    if (selectedPost) {
      const postDoc = doc(db, "posts", selectedPost.id);
      const updatedPostContent = document.getElementById("editedContent").value;
      if (updatedPostContent) {
        await updateDoc(postDoc, { postText: updatedPostContent });
        toast.success("Post updated successfully!");
        closeEditModal();
        window.location.reload();
      }
    }
  };


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
      // Find the index of the post to be pinned
      const pinnedPostIndex = data.findIndex((post) => post.id === "Pci3H6XCUJHtiBZgYrlA");
      if (pinnedPostIndex !== -1) {
        // Extract the pinned post from the array
        const pinnedPost = data.splice(pinnedPostIndex, 1)[0];
        // Update the state with the updated postLists array
        setPostList([pinnedPost, ...data]);
      } else {
        setPostList(data);
      }
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
                        `/user/${post.author.name.replaceAll(" ", "-")}/${post.id
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
                          const confirmed = window.confirm(
                            "Are you sure you want to delete this post?"
                          );
                          if (confirmed) {
                            deletePost(post.id);
                          }
                        }}
                      >
                        {" "}
                        <i
                          className="bx bxs-message-square-x"
                          style={{ color: "#600505" }}
                        ></i>
                      </button>
                    )}
                  <button className="expandElement"
                    onClick={() =>
                      sharingHandler(
                        `/user/${post.author.name.replaceAll(" ", "-")}/${post.id
                        }`
                      )
                    }
                  >
<i className="bx bxs-share-alt"></i>

                  </button>
                  {isAuth &&
                    auth.currentUser != null &&
                    post.author.id === auth.currentUser.uid && (
                      <button onClick={() => openEditModal(post)}>
                        <i
                          className="bx bxs-pencil"
                          style={{ color: "#000000" }}
                        ></i>
                      </button>
                    )}

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
                      'justify-self': "end"
                    }}
                    onClick={() => {
                      navigate(
                        `/user/${post.author.name.replaceAll(" ", "-")}/${post.id
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

      <Modal
        isOpen={showModal}
        onRequestClose={closeEditModal}
        contentLabel="Edit Post Modal"
        style={{ overlay: { background: "transparent" }, content: { color: "#fff" } }}>
        <div style={{ height: "100%", background: "#1D1B31", padding: "20px"}}>
          <h2 className="edit-heading">Edit Your Post</h2>
          {selectedPost && (
            <div>
              <label htmlFor="editedContent" className="edit-label">Update your content:</label>
              <textarea
                id="editedContent"
                defaultValue={selectedPost.postText}
                rows="10"
                className="edit-textarea"
              ></textarea>

            </div>
          )}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button onClick={handleModalSubmit} className="button">Submit</button>
            <button onClick={closeEditModal} className="button buttonGap">Back</button>
          </div>
        </div>

      </Modal>
    </>
  );
}

export default Home;
