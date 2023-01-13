import React, { useEffect, useState } from "react";
import "./SidebarOnDesktop.css";
import "boxicons";
import { auth } from "../../firebase-config";
import { Link } from "react-router-dom";

const SidebarOnDesktop = ({ isAuth, signUserOut }) => {
  const [state, setState] = useState(false);
  const toggleSidebarOnDesktop = () => {
    setState((prevState) => ({ active: !prevState.active }));
  };
  const [currUser, setCurrUser] = useState([]);
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  if (isAuth) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      setCurrUser(auth.currentUser);
      setUrl(auth.currentUser.photoURL);
      setName(auth.currentUser.displayName);
      console.log(111)
    }, []);
  }
  const { active } = state;
  return (
    <div className={`SidebarOnDesktop ${active ? "active" : ""}`}>
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
            <b>BLOGWEET</b>
          </div>
        </div>
        <i
          className="bx bxl-twitter"
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
            <i class="bx bxs-home-heart"></i>
            <span className="link_names">Home</span>
          </Link>
          <span className="tooltip">Home</span>
        </li>
        {isAuth && (
          <li onClick={toggleSidebarOnDesktop}>
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
              {currUser != null && <img src={url} alt="" />}
              <div className="name_job">
                {currUser != null && <div className="name">{name}</div>}
              </div>
            </div>
            <li onClick={toggleSidebarOnDesktop}>
              <i className="bx bx-log-out" id="log_out" onClick={signUserOut} />
            </li>
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarOnDesktop;
