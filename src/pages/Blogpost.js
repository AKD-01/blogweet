import {
  collection,
  getDocs,
  doc,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { db } from "../firebase-config";
import "./pages.css";
import "react-toastify/dist/ReactToastify.css";
import { FaThumbsUp } from "react-icons/fa";
import MoonLoader from "react-spinners/MoonLoader";

const Blogpost = () => {
  const postId = useParams();
  const [postLists, setPostList] = useState([]);
  const [liked, setLiked] = useState(false);
  const postsCollectionRef = collection(db, "posts");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setIsLoading(false);
    };

    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sharingHandler = (s) => {
    navigator.clipboard.writeText(`https://blogweet.vercel.app${s}`);
    toast(`Your link has been copied to the clipboard. Enjoy!`);
  };

const toggleLike = async () => {
  if (liked) {
    // Decrease the like count and update the like status in the database
    const postRef = doc(db, "posts", postId.blogname);
    await updateDoc(postRef, { liked: false, likes: post.likes - 1 });

    // Update the like count and liked state locally
    setPostList((prevPostList) =>
      prevPostList.map((postItem) => {
        if (postItem.id === postId.blogname) {
          const updatedLikes = postItem.likes - 1 >= 0 ? postItem.likes - 1 : 0;
          return { ...postItem, liked: false, likes: updatedLikes };
        }
        return postItem;
      })
    );
    setLiked(false);
  } else {
    // Update the like status in the database
    const postRef = doc(db, "posts", postId.blogname);
    await updateDoc(postRef, { liked: true, likes: post.likes + 1 });

    // Update the like count and liked state locally
    setPostList((prevPostList) =>
      prevPostList.map((postItem) => {
        if (postItem.id === postId.blogname) {
          return { ...postItem, liked: true, likes: postItem.likes + 1 };
        }
        return postItem;
      })
    );
    setLiked(true);
  }
};

  const getComments = async () => {
    // Retrieve comments from the database based on the postId
    const commentsQuerySnapshot = await collection(db, "comments")
      .where("postId", "==", postId.blogname)
      .get();
    const commentsData = commentsQuerySnapshot.docs.map((doc) => doc.data());
    console.log("commentsData:", commentsData);
    setComments(commentsData);
  };

  const submitComment = async () => {
    // Validate if the newComment is not empty
    if (newComment.trim() === "") {
      return;
    }

    // Create a new comment object
    const newCommentObject = {
      postId: postId.blogname,
      comment: newComment,
      timestamp: new Date().getTime(),
    };

    // Save the new comment to the database
    await addDoc(collection(db, "comments"), newCommentObject);

    // Clear the input field
    setNewComment("");

    // Update the comments state with the new comment
    setComments((prevComments) => [...prevComments, newCommentObject]);
  };

  useEffect(() => {
    const getComments = async () => {
      // Retrieve comments from the database based on the postId
      const commentsQuerySnapshot = await collection(db, "comments")
        .where("postId", "==", postId.blogname)
        .get();
      const commentsData = commentsQuerySnapshot.docs.map((doc) => doc.data());
      setComments(commentsData);
    };

    getComments();
  }, [postId]);
  console.log("postId.blogname:", postId.blogname);
  getComments();

  const postInfo = postLists.find((x) => x.id === postId.blogname);
  const post = postInfo ? postInfo : null;
  return (
    <div>
      {isLoading ? (
        <div className="centered">
          <MoonLoader />
        </div>
      ) : (
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
                      boxShadow: " 1px 1px 1rem black",
                      borderRadius: "1rem",
                      background: "black",
                      fontSize: "2rem",
                      cursor: "pointer",
                    }}
                  ></i>
                </button>
              </div>

              <hr />

              <div className="blogcredits">
                <div>👤{post.author.name}</div>
                {post.date && (
                  <div style={{ textAlign: "right", marginRight: "1rem" }}>
                    📅{post.date}
                  </div>
                )}
              </div>
              <hr />
              <div className="blogContent">
                <img src={post.image} alt={post.title} />
                <p>{post.postText}</p>
              </div>
              <div className="lik">
                <button className="likeButton" onClick={toggleLike}>
                  <FaThumbsUp />
                  
                </button>
                <span>
                  {post.likes} {post.likes === 1 ? "like" : "likes"}
                </span>
              </div>
              <div className="addComment">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                />
                <button onClick={submitComment}>Submit</button>
              </div>
              <div className="commentsSection">
                <h2>Comments</h2>
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <div key={comment.timestamp} className="comment">
                      <p>{comment.comment}</p>
                      <p className="commentTimestamp">
                        {new Date(comment.timestamp).toLocaleString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No comments yet</p>
                )}
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
      )}
    </div>
  );
};
export default Blogpost;
