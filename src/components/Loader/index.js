import React from "react";
import "./index.css";
const index = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "55%",
        transform: "translate(-50%,-50%)",
      }}
    >
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p>Loading...</p>
    </div>
  );
};

export default index;
