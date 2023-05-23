import React, { useState } from "react";
import "./SidebarOnDesktop.css";
//import "boxicons";
import { auth } from "../../firebase-config";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {FaBloggerB} from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';



const SidebarOnDesktop = ({ isAuth, signUserOut }) => {
  const [state, setState] = useState(true);
  const navigate= useNavigate();
  const location= useLocation()
    function pathMatchingRoute(route){
        return route=== location.pathname ? true: false;
    }
  const toggleSidebarOnDesktop = () => {
    setState(!state);
  };

  return (
    <div className={`SidebarOnDesktop active`}>
      <div className="logo_content">
        <div className="logo">
        <FaBloggerB style={{ fontSize: "1.8rem", marginTop: ".5rem", }}/>
          <div
            className="logoname"
            style={{
              marginLeft: "8px",
              fontSize: "1.8rem",
              marginTop: ".5rem",
            }}
          >
            <b>BLOGWEET</b>
          </div>
        </div>
        
      </div>
      <ul className="nav_list">
        <li onClick={toggleSidebarOnDesktop}>
          <Link to="/" className={`${pathMatchingRoute("/") && `active_class`}`}>
            <i className="bx bxs-home-heart"></i>
            <span className="link_names">Home</span>
          </Link>
          <span className="tooltip">Home</span>
        </li>
        <li>
          <Link to="/about" className={`${pathMatchingRoute("/about") && `active_class`}`}>
            <i class='bx bxs-info-circle'></i>
            <span className="link_names">About</span>
          </Link>
        </li>   
        {isAuth && (
          <li onClick={toggleSidebarOnDesktop}>
            <Link to="/createpost" className={`${pathMatchingRoute("/createpost") && `active_class`}`}>
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
            />
            <span
              className="link_names"
              style={{ left: "2.5rem", position: "relative", bottom: ".1rem" }}
            >
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
                <img src={auth.currentUser.photoURL} alt="" id="my-anchor-element" onClick={()=>{navigate('/' + `${auth.currentUser.displayName}`)}}/>
              )}
              <Tooltip anchorSelect="#my-anchor-element" content="Profile"/>
              <div className="name_job">
                {auth.currentUser != null && (
                  <div className="name">{auth.currentUser.displayName}</div>
                )}
              </div>
              
            </div>
            <i className="bx bx-log-out" id="log_out" onClick={signUserOut} />
            <Tooltip anchorSelect="#log_out" content="Logout"/>
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarOnDesktop;
