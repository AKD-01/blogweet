import React from "react";
import "./index.css";

const LoginButton = (props) => {
  const SignInHandler = () => {
    props.signIn();
  };
  return (
    
    <button 
    className="button-57"
    style={{ backgroundColor: `${props.bgColor}` }}
    onClick={SignInHandler}
    >
      
      <span className="text" style={{ display: "flex" }}>
        <i className={props.image} style={{ color: "#18181a" }} />
        <div style={{ marginTop: ".15rem", marginLeft: ".5rem" }}>
          {props.label}
        </div>
      </span>
      <span style={{ color: `${props.altColor}` }}>{props.alt}</span>
    </button>
  
  );
};


export default LoginButton;
