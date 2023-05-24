import React from 'react'
import {FaGithub, FaArrowLeft} from 'react-icons/fa'
import './Footer.css'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='footer-text'>
    <p>Copyright  &copy; {new Date().getFullYear()}.<Link to="/"> BlogWeet</Link>. All rights reserved.</p>
      <a href="https://github.com/AKD-01/blogweet" className=''><FaGithub className='social-icon'/></a> <FaArrowLeft/>  Follow me on Github for more exciting projects!
    </footer>

  )
}

export default Footer