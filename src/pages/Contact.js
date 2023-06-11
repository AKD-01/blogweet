import React from "react";
import "./Contact.css";
const Contact = () => {
  return (
    <div className="Contactus">
      <h1>Contact Us</h1>
      <hr />
      <p>Please fill out the form below to get in touch with us:</p>
      <form className="ContactForm">
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name"></input>
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email"></input>
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea id="message" rows="6"></textarea>
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Contact;
