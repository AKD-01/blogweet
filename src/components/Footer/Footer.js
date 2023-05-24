import React from 'react'
import {FaGithub, FaArrowLeft} from 'react-icons/fa'
import './Footer.css'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='footer-text'>
    <p>Copyright  &copy; {new Date().getFullYear()}.<Link to="/"> BlogWeet</Link>. All rights reserved.</p>
    </footer>

  )
}

export default Footer