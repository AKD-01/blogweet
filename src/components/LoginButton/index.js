import React from 'react'
import './index.css'

const LoginButton = (props) => {
  return (
    <button
      className="button-57"
      style={{ backgroundColor: `${props.bgColor}` }}
    >
      <span class="text">{props.label}</span>
      <span style={{color:`${props.altColor}`}}>{props.alt}</span>
    </button>
  );
}

export default LoginButton