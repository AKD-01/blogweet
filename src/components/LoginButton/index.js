import React from 'react'
import './index.css'

const LoginButton = (props) => {
  const SignInHandler = () =>{
    props.signIn();
  }
  return (
    <button
      className="button-57"
      style={{ backgroundColor: `${props.bgColor}` }}
      onClick={SignInHandler}
    >
      <span class="text">
        <span>
          <img src={props.image} alt={props.label} />{" "}
        </span>
        <span>{props.label}</span>
      </span>
      <span style={{ color: `${props.altColor}` }}>{props.alt}</span>
    </button>
  );
}

export default LoginButton