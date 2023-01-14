import React, { useEffect, useState } from "react";
import "./SidebarOnDesktop.css";
import "boxicons";
import { auth } from "../../firebase-config";
import { Link } from "react-router-dom";

const SidebarOnDesktop = ({ isAuth, signUserOut }) => {
  const [state, setState] = useState(true);

  const toggleSidebarOnDesktop = () => {
    setState(!state);
  };

  return (
    <div className={`SidebarOnDesktop active`}>
      <div className="logo_content">
        <div className="logo">
          <div
            className="logoname"
            style={{
              marginLeft: "5px",
              fontSize: "1rem",
              marginTop: ".5rem",
            }}
          >
            <b>BLOGWEET</b>
          </div>
        </div>
        <i
          className="bx bxl-twitter bx-tada"
          id="btn"
          style={{ fontSize: "25px" }}
          onClick={toggleSidebarOnDesktop}
        />
      </div>
      <ul className="nav_list">
        {/* <li>
            <i className="bx bx-search" />
            <input type="text" placeholder="Search..." />
            <span className="tooltip">Search</span>
          </li> */}
        <li onClick={toggleSidebarOnDesktop}>
          <Link to="/">
            <i className="bx bxs-home-heart"></i>
            <span className="link_names">Home</span>
          </Link>
          <span className="tooltip">Home</span>
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
      {!isAuth && (<li>
        <Link to="login" id="log_in">
          <i
            className="bx bx-log-in bx-fade-left"
            id="log_in"
            onClick={toggleSidebarOnDesktop}
          />
          <span
            className="link_names"
            style={{ left: "2.5rem", position: "relative", bottom: ".1rem" }}
          >
            Log in
          </span>
        </Link></li>
      )}
      {isAuth && (
        <div className="profile_content" id="profile" >
          <div className="profile">
            <div className="profile_details">
              {auth.currentUser != null && <img src={auth.currentUser.photoURL} alt="" />}
              <div className="name_job">
                {auth.currentUser != null && <div className="name">{auth.currentUser.displayName}</div>}
              </div>
            </div>
            <i className="bx bx-log-out" id="log_out" onClick={signUserOut} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarOnDesktop;
