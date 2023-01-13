import React, { useState } from "react";
import "./Sidebar.css";
import "boxicons";
import { auth } from "../../firebase-config";
import { Link } from "react-router-dom";

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
          {/* <i className="bx bxl-c-plus-plus" style={{ fontSize: "30px" }} /> */}
          <div
            className="logoname"
            style={{
              marginLeft: "5px",
              fontSize: "1rem",
              marginTop: ".5rem",
            }}
          >
            🇧 🇱 🇴 🇬 🇼 🇪 🇪 🇹🐦
          </div>
        </div>
        <i
          className="bx bx-menu-alt-right"
          id="btn"
          style={{ fontSize: "25px" }}
          onClick={toggleSidebar}
        />
      </div>
      <ul className="nav_list">
        {/* <li>
            <i className="bx bx-search" />
            <input type="text" placeholder="Search..." />
            <span className="tooltip">Search</span>
          </li> */}
        <li>
          <Link to="/">
            <i class="bx bxs-home-heart"></i>
            <span className="link_names">Home</span>
          </Link>
          <span className="tooltip">Home</span>
        </li>
        {isAuth && (
          <li>
            <Link to="/createpost">
              <i class="bx bxs-pencil"></i>
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
            style={{ left: "1rem", position: "relative", bottom: ".15rem" }}
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
            <li>
              <i className="bx bx-log-out" id="log_out" onClick={signUserOut} />
            </li>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
