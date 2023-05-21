import React, { useState } from "react";
import "./profile.css";
import { auth } from "../firebase-config";

const Profile = ({ isAuth , signUserOut }) => {
  const [state, setState] = useState(false);
  const toggleSidebar = () => {
    setState((prevState) => !prevState);
  };



  return (
    <div className="profile-container">
      <div className="profile-details">
        {auth.currentUser != null && (
          <img src={auth.currentUser.photoURL} alt="" width="100px" height="100px" />
        )}
        <div className="name">
          <span>Name:</span> {auth.currentUser != null && <div className="name">{auth.currentUser.displayName}</div>}
        </div>
        <div className="email">
          <span>Email:</span> {auth.currentUser != null && <div className="name">{auth.currentUser.email}</div>}
        </div>
      </div>
      
    </div>
  );
};

export default Profile;
