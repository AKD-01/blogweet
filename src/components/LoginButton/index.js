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
      
      <span className="text" style={{ display: "flex" , justifyContent:'space-around'}}>
        <i className={props.image} style={{ color: "#18181a",marginLeft:'.5rem',  marginTop: ".3rem"}} />
        <div style={{ marginTop: ".3rem",marginRight:'1rem'}}>
          {props.label}
        </div>
      </span>
      <span style={{ color: `${props.altColor}` }}>{props.alt}</span>
    </button>
  
  );
};


export default LoginButton;
