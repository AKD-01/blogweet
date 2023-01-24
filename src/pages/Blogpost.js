import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { db } from "../firebase-config";
import "./pages.css";
import 'react-toastify/dist/ReactToastify.css';


const Blogpost = () => {
  // const post = useParams();
  // console.log(post.blogname)
  // const postsCollectionRef = collection(db, "posts");
  // console.log(postsCollectionRef)
  const postId = useParams();
  const postRef = doc(db, "posts", postId.blogname);

  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
    // console.log(11);
  }, []);
  const isPost = (id) => {
    return id == postId.blogname;
  };
  const sharingHandler = (s) => {
    // console.log(`https://blogweet.vercel.app${s}`);
    navigator.clipboard.writeText(`https://blogweet.vercel.app${s}`);
    toast(`Your link has been pasted to your Clipboard. Enjoy!`);

  }
  // console.log(postLists.filter(x => x.id==postId.blogname)[0])
  const location = useLocation();
  // console.log(location.state)
  const postInfo = postLists.filter((x) => x.id == postId.blogname)[0];
  // const [post, setPost] = useState({});
  // useEffect(()=>{
  //   setPost(postLists.filter(x => x.id==postId.blogname)[0])
  //   console.log(post,Object.keys(post))
  // },[])
  console.log(Array.of(postInfo)[0]);
  const post = Array.of(postInfo)[0];
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
                  onClick={() => sharingHandler(
                    `/${post.author.name.replaceAll(" ", "-")}/${post.id}`
                  )}
                  
                >
                  <i
                    className="bx bxs-share-alt"
                    style={{
                      color: "rgb(255, 255, 255)",
                      boxShadow: " 1px 1px 1rem black",
                      borderRadius: "1rem",
                      background: " black",
                      fontSize: "2rem",
                      cursor: "pointer"
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
