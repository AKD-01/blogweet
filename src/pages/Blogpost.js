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
      <div className='blogtitle'>{post.title}</div>
      <hr/>
      <div className='blogcredits'>
        👤{post.author.name}
      </div>
      <hr/>
      {post.date !=null && <div style={{textAlign:"right", marginRight:"1rem"}}>{post.date}</div>}
      <hr/>
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