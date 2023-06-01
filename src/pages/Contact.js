import React from "react";
import "./Contact.css";
const Contact = () => {
  return (
    <div className="Contactus">
      <div className="login">
        <div className="left">
          <img
            src="https://images.pexels.com/photos/261579/pexels-photo-261579.jpeg?cs=srgb&dl=pexels-pixabay-261579.jpg&fm=jpg"
            alt="login_image"
          ></img>
        </div>
        <div className="right">
          <div className="title">Contact Us</div>
          <div className="subtitle">Please fill out the form below to get in touch with us:</div>
          <form className="form">
            <div className="inputs">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name"></input>
            </div>
            <div className="inputs">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email"></input>
            </div>
            <div className="inputs">
              <label htmlFor="message">Message:</label>
              <textarea id="message" rows="6"></textarea>
            </div>
            <button>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
