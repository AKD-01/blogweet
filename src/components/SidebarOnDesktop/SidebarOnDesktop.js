import React, { useState } from 'react'
import './SidebarOnDesktop.css'
import 'boxicons'
import { auth } from '../../utils/firebase'
import { Link, useLocation } from 'react-router-dom'

const SidebarOnDesktop = ({ isAuth, signUserOut }) => {
  const location = useLocation()

  const [state, setState] = useState(true)

  const toggleSidebarOnDesktop = () => {
    setState(!state)
  }

  // only don't show sidebar in createpost screen
  if (location.pathname === '/createpost') {
    return null
  }

  return (
    <div className={`SidebarOnDesktop active`}>
      <div className="logo_content">
        <div className="logo">
          <div
            className="logoname"
            style={{
              marginLeft: '5px',
              fontSize: '1.8rem',
              marginTop: '.5rem',
            }}>
            <b>BLOGWEET</b>
          </div>
        </div>
        <i
          className="bx bxl-twitter bx-tada"
          id="btn"
          style={{ fontSize: '25px' }}
          onClick={toggleSidebarOnDesktop}
        />
      </div>
      <ul className="nav_list">
        <li onClick={toggleSidebarOnDesktop}>
          <Link to="/">
            <i className="bx bxs-home-heart"></i>
            <span className="link_names">Home</span>
          </Link>
          <span className="tooltip">Home</span>
        </li>
        <li onClick={toggleSidebarOnDesktop}>
          <Link to="/about">
            <i class="bx bxs-info-circle"></i>
            <span className="link_names">About</span>
          </Link>
        </li>
        <li>
          <Link to="/contact">
            <i class="bx bxs-user-circle"></i>
            <span className="link_names">Contact Us</span>
          </Link>
        </li>
        {isAuth && (
          <li onClick={toggleSidebarOnDesktop}>
            <Link to="/createpost">
              <i className="bx bxs-pencil"></i>
              <span className="link_names">Create Post</span>
            </Link>
            <span className="tooltip">Create Post</span>
          </li>
        )}
        {/* other list items */}
      </ul>
      {!isAuth && (
        <li>
          <Link to="login" id="log_in">
            <i
              className="bx bx-log-in bx-fade-left"
              id="log_in"
              onClick={toggleSidebarOnDesktop}
              style={{
                color: 'white',
              }}
            />
            <span
              className="link_names login-button"
              style={{
                left: '2.5rem',
                position: 'relative',
                bottom: '.1rem',
                color: 'white',
              }}>
              Log in
            </span>
          </Link>
        </li>
      )}
      {isAuth && (
        <div className="profile_content" id="profile">
          <div className="profile">
            <div className="profile_details">
              {auth.currentUser != null && (
                <img src={auth.currentUser.photoURL} alt="" />
              )}
              <div className="name_job">
                {auth.currentUser != null && (
                  <div className="name">{auth.currentUser.displayName}</div>
                )}
              </div>
            </div>
            <i className="bx bx-log-out" id="log_out" onClick={signUserOut} />
          </div>
        </div>
      )}
    </div>
  )
}

export default SidebarOnDesktop
