import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Home({ isAuth }) {
  const [postLists, setPostList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [after, setAfter] = useState("");
  const [before, setBefore] = useState("");

  const postsCollectionRef = collection(db, "posts");
  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
    window.location.reload();
  };

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  }, []);

  const navigate = useNavigate();

  const sharingHandler = (s) => {
    navigator.clipboard.writeText(`https://blogweet.vercel.app${s}`);
    toast(`Your link has been copied to the clipboard. Enjoy!`);
  };

  const filteredPosts = postLists.filter((post) => {
    const titleMatch = post.title.toLowerCase().includes(searchText.toLowerCase());
    const postDate = new Date(post.date).getTime();
    const afterDate = after ? new Date(after).getTime() : null;
    const beforeDate = before ? new Date(before).getTime() : null;

    if (after && before) {
      return titleMatch && postDate >= afterDate && postDate <= beforeDate;
    } else if (after) {
      return titleMatch && postDate >= afterDate;
    } else if (before) {
      return titleMatch && postDate <= beforeDate;
    }

    return titleMatch;
  });


  return (
    <div className="homePage">
      <div className="filters">
        <div className="searchInput">
          <span class="material-symbols-rounded">
            manage_search
          </span>
          <input
            type="text"
            placeholder="Search here.."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

        </div>
        <div className="dateRangeInput">
          <label htmlFor="afterDate">After:</label>
          <input
            type="date"
            id="afterDate"
            placeholder="After"
            value={after}
            onChange={(e) => setAfter(e.target.value)}
          />

          <label htmlFor="beforeDate">Before:</label>
          <input
            type="date"
            id="beforeDate"
            placeholder="Before"
            value={before}
            onChange={(e) => setBefore(e.target.value)}
          />
        </div>

      </div>
      {filteredPosts.map((post) => (
        <div className="post" key={post.id}>
          <div className="postHeader">
            <div>
              <h1
                className="title"
                onClick={() => {
                  navigate(`/${post.author.name.replaceAll(" ", "-")}/${post.id}`, { state: post });
                }}
              >
                {post.title}
              </h1>
            </div>

            <div className="deletePost">
              {isAuth && auth.currentUser != null && post.author.id === auth.currentUser.uid && (
                <button
                  onClick={() => {
                    deletePost(post.id);
                  }}
                >
                  <i className="bx bxs-message-square-x" style={{ color: "#600505" }}></i>
                </button>
              )}
              <button
                onClick={() =>
                  sharingHandler(`/${post.author.name.replaceAll(" ", "-")}/${post.id}`)
                }
              >
                <i
                  className="bx bxs-share-alt"
                  style={{
                    color: "rgb(255, 255, 255)",
                    boxShadow: " 1px 1px 1rem black",
                    borderRadius: "1rem",
                    background: " black",
                  }}
                ></i>
              </button>
            </div>
          </div>
          <div className="contents">
            <div className="imageCont">
              <img src={post.image} alt={post.title} />
            </div>
            <div className="postTextContainer">
              <div style={{ height: "70px", overflow: "hidden" }}>
                {post.postText.substr(0, Math.min(post.postText.length, 200))}
                &nbsp;&nbsp;{" "}
              </div>
              <div
                style={{
                  textAlign: "right",
                  color: "#3a363d",
                  fontSize: ".9rem",
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate(`/${post.author.name.replaceAll(" ", "-")}/${post.id}`, { state: post });
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
                navigate(`/${post.author.name.replaceAll(" ", "-")}`, { state: post.author });
              }}
            >
              👤{post.author.name}
            </div>
          </h3>
        </div>
      ))}
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
}

export default Home;


