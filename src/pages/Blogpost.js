import { getPostsFromDb } from "../utils/firebase";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "./pages.css";
import "react-toastify/dist/ReactToastify.css";

const Blogpost = () => {
  const postId = useParams();
  const [postLists, setPostList] = useState([]);
  const [post, setPost] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(postId.blogname);
    const getPosts = async () => {
      const data = await getPostsFromDb();
      const postInfo = data.filter((x) => x.id === postId.blogname)[0];
      if (!postInfo) {
        navigate("/404");
      }
      setPost(Array.of(postInfo)[0]);
      setPostList(data);
    };

    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sharingHandler = (s) => {
    navigator.clipboard.writeText(`https://blogweet.vercel.app${s}`);
    toast(`Your link has been pasted to your Clipboard. Enjoy!`);
  };
  // const postInfo = postLists.filter((x) => x.id === postId.blogname)[0];
  // console.log(Array.of(postInfo)[0]);
  // const post = Array.of(postInfo)[0];
  return (
    <div className="blogpage">
      {post && (
        <>
          <div className="blogtitle">
            <div className="three">
              <h1>{post.title}</h1>
            </div>
            <button
              className="shareButton"
              onClick={() =>
                sharingHandler(
                  `/${post.author.name.replaceAll(" ", "-")}/${post.id}`
                )
              }
            >
              <i
                className="bx bxs-share-alt"
                style={{
                  color: "rgb(255, 255, 255)",
                  boxShadow: " 0px 0px 0.2rem black",
                  borderRadius: "1rem",
                  background: " black",
                  fontSize: "2rem",
                  cursor: "pointer",
                }}
              ></i>
            </button>
          </div>

          <hr />

          <div className="blogcredits">
            <div>👤{post.author.name}</div>
            <div>
              {post.date != null && (
                <div style={{ textAlign: "right", marginRight: "1rem" }}>
                  📅{post.date}
                </div>
              )}
            </div>
          </div>
          <hr />
          <div className="blogContent">
            <img src={post.image} alt={post.title} />
            <p>{post.postText}</p>
          </div>
        </>
      )}
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
    </div>
  );
};

export default Blogpost;
