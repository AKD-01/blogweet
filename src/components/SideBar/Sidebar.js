import React, { useState } from "react";
import "./Sidebar.css";
<<<<<<< HEAD
//import "boxicons";
import { auth } from "../../firebase-config";
=======
import "boxicons";
import { auth } from "../../utils/firebase";
>>>>>>> 4b78d19dc4150835dde028bd09b2c44440b29b33
import { Link } from "react-router-dom";
import {FaBloggerB} from 'react-icons/fa';

const Sidebar = ({ isAuth, signUserOut }) => {
  const [state, setState] = useState(false);
  const toggleSidebar = () => {
    setState((prevState) => ({ active: !prevState.active }));
  };

  const { active } = state;
  return (
    <div className={`sidebar ${active ? "active" : ""}`}>
      <div className="logo_content">
        <div className="logo">
        <FaBloggerB style={{ fontSize: "1.8rem", marginTop: ".5rem", }}/>
          <div
            className="logoname"
            style={{
              marginLeft: "5px",
              fontSize: "1.5rem",
              marginTop: ".5rem",
            }}
          >
            <b>BLOGWEET</b>
          </div>
        </div>
      </div>
      <ul className="nav_list">
        <li onClick={toggleSidebar}>
          <Link to="/">
            <i className="bx bxs-home-heart"></i>
            <span className="link_names">Home</span>
          </Link>
          <span className="tooltip">Home</span>
        </li>
        <li onClick={toggleSidebar}>
          <Link to="/about">
            <i class="bx bxs-info-square"></i>
            <span className="link_names">About</span>
          </Link>
        </li>
        {isAuth && (
          <li onClick={toggleSidebar}>
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
        <Link to="login" id="log_in">
          <i
            className="bx bx-log-in"
            id="log_in"
            // onClick={}
          />
          <span
            className="link_names"
            style={{ left: "2.5rem", position: "relative", bottom: ".1rem" }}
          >
            Log in
          </span>
        </Link>
      )}
      {isAuth && (
        <div className="profile_content">
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
            <li onClick={toggleSidebar}>
              <i className="bx bx-log-out" id="log_out" onClick={signUserOut} />
            </li>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
