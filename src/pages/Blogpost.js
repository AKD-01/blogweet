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
        By - {post.author.name}
      </div>
      {post.date !=null && <div>{post.date}</div>}
      <hr/>
      <div>
        <img src={post.image} alt={post.title} />
      </div>
      </div>
  )
}

export default Blogpost