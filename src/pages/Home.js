import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";

function Home({ isAuth }) {
  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");
  console.log(auth.toJSON());
  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
    window.location.reload();
  };
  const DUMMY_POST = {
    id: `id:${Math.random()}`,
    title: "Dummy Post",
    author: { name: "Dummy Author", id: Math.random() },
    key: Math.random(),
    postText: "Hi how are you dummy man",
    image: "https://avatars.githubusercontent.com/in/8329?s=80&v=4",
  };
  postLists.push(DUMMY_POST);
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
    console.log(11);
  }, []);
  const navigate = useNavigate();
  return (
    <div className="homePage">
      {postLists.map((post) => {
        console.log(post);
        return (
          <div className="post" key={post.id}>
            <div className="postHeader">
              <div>
                {/* <Link
                  to={{
                    pathname : `/${post.author.name.replaceAll(" ", "-")}/${post.id}`,
                    state:[{id:post.id, title:post.title}]
                  }} 
                > */}
                <h1
                  className="title"
                  onClick={() => {
                    navigate(
                      `/${post.author.name.replaceAll(" ", "-")}/${post.id}`,
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
                        deletePost(post.id);
                      }}
                    >
                      {" "}
                      &#128465;
                    </button>
                  )}
              </div>
            </div>
            <div className="contents">
              <div className="imageCont">
                <img src={post.image} alt={post.title} />
              </div>
              <div className="postTextContainer">
                {" "}
                {post.postText.substr(0, Math.min(post.postText.length, 200))}
                &nbsp;&nbsp;{" "}
                <div
                  style={{
                    textAlign: "right",
                    color: "#3a363d",
                    fontSize: ".9rem",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigate(
                      `/${post.author.name.replaceAll(" ", "-")}/${post.id}`,
                      { state: post }
                    );
                  }}
                >
                  ......Read More
                </div>
              </div>
            </div>
            <h3>-{post.author.name}</h3>
            {/* <h3>-{post.author.name}</h3> */}
          </div>
        );
      })}
    </div>
  );
}

export default Home;
