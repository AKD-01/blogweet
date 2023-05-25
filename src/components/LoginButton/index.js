import React from "react";
import "./index.css";

import { Button } from "@mui/material";

const LoginButton = (props) => {
  const SignInHandler = () => {
    props.signIn();
  };
  return (
    <Button
      style={{
        backgroundColor: `${props.bgColor}`,
        color: `${props.color}`,
        width: "60%",
        margin: "1em",
      }}
      onClick={SignInHandler}
      variant="contained"
      startIcon={ props.icon }
    >
      <span className="text" style={{ display: "flex" }}>
        <div>
          {props.label}
        </div>
      </span>
    </Button>
  );
};

export default LoginButton;
