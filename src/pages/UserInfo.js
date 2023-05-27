import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./UserInfo.css";

const UserInfo = () => {
  const location = useLocation();
  console.log(location.state);
  let user;
  if (location.state) {
    user = location.state;
  } else {
    user = {
      name: "Dummy User",
      email: "user@gmail.com",
      photoUrl: "https://avatars.githubusercontent.com/in/8329?s=80&v=4",
    };
  }
  const navigate = useNavigate();
  useEffect(() => {
    if (!location.state) {
      navigate("/404");
    }
  }, [location.state, navigate]);

  return (
    <>
      <div className="card">
        <img src={user.photoUrl} alt={user.name} className="card-img" />
        <div className="card-body">
          <h3 className="card-title">{user.name}</h3>
          <p className="card-text">Email: {user.email}</p>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
