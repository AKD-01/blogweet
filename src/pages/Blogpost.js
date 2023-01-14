import React from 'react'
import { useLocation } from 'react-router-dom'
import './pages.css'

const Blogpost = () => {
  // const post = useParams();
  // console.log(post.blogname)
  // const postsCollectionRef = collection(db, "posts");
  // console.log(postsCollectionRef)
  const location = useLocation();
  console.log(location.state)
  const post = location.state;
  return (
    <div className='blogpage'>
      <div className='blogtitle'>
        <div class="three">
          <h1>{post.title}</h1>
        </div>
      </div>
      <hr />
      <div className='blogcredits'>
        <div>👤{post.author.name}</div>
        <div>{post.date != null && <div style={{ textAlign: "right", marginRight: "1rem" }}>📅{post.date}</div>}</div>
      </div>
      <hr />
      <div className='blogContent'>
        <img src={post.image} alt={post.title} />
        <p>
          {post.postText}
        </p>
      </div>
    </div>
  )
}

export default Blogpost