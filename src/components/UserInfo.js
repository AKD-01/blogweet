import React from "react";
import { auth } from "../utils/firebase";
import "./UserInfo.css";

const UserInfo = ({isAuth}) => {

  return (
    <>
      {isAuth && (
        <div className="card">
        {auth.currentUser.photoURL=== null ? (<img src="/public/avatar.png" alt={auth.currentUser.displayName} className="card-img"/>) :(<img src={auth.currentUser.photoURL} alt={auth.currentUser.displayName} className="card-img" />)}
        <div className="card-body">
          <h3 className="card-title">{auth.currentUser.displayName}</h3>
          <p className="card-text">Email: {auth.currentUser.email}</p>
        </div>
      </div>
      )}
    </>
  );
};

export default UserInfo;
