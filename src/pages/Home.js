import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import "./Home.css";
import { Link } from "react-router-dom";

function Home({ isAuth }) {
  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");

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

  return (
    <div className="homePage">
      {postLists.map((post) => {
        return (
          <div className="post" key={post.id}>
            <div className="postHeader">
              <div className="title">
                <h1> {post.title}</h1>
              </div>
              <div className="deletePost">
                {isAuth && auth.currentUser!=null && post.author.id === auth.currentUser.uid && (
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
            <div className="postTextContainer"> {post.postText} </div>
            <Link to={`/${post.author.name.replaceAll(" ", "-")}`}>
              <h3>-{post.author.name}</h3>
            </Link>
            {/* <h3>-{post.author.name}</h3> */}
          </div>
        );
      })}
    </div>
  );
}

export default Home;
