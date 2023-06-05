import React, { useEffect, useState } from "react";
import { getPostsFromDb, deletePostFromDb } from "../utils/firebase";
import { auth } from "../utils/firebase";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

function Home({ isAuth }) {
  const [postLists, setPostList] = useState([]);
  const deletePost = async (id) => {
    await deletePostFromDb(id);
    window.location.reload();
  };

  const parseHTMLToText = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  useEffect(() => {
    const getPosts = async () => {
      const data = await getPostsFromDb();
      setPostList(data);
    };

    getPosts();
  }, []);

  const navigate = useNavigate();
  const sharingHandler = (s) => {
    navigator.clipboard.writeText(`https://blogweet.vercel.app${s}`);
    toast.success(`Your link has been copied to the clipboard. Enjoy!`);
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
        {postLists.map((post) => (
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
                  {parseHTMLToText(post.title)}
                </h1>
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
                  {parseHTMLToText(
                    post.postText.substr(
                      0,
                      Math.min(post.postText.length, 200)
                    )
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
                    justifySelf: "end"
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
                  navigate(
                    `/user/${post.author.name.replaceAll(" ", "-")}`,
                    { state: post.author }
                  );
                }}
              >
                👤{post.author.name}
              </div>
            </h3>
          </div>
        ))}
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
    </>
  );
}

export default Home;
