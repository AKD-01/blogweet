import React, { useState } from "react";
import "./Contact.css";
import contactUs from "../assets/svg-icons/contactUs.png";
const Contact = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const handelChange = (e) => {
    const name = e.target.value;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    alert(data);
  };
  return (
    <>
      <div className="Contactus">
        <h1>CONTACT US</h1>
        <hr />
      </div>
      <form method="post" onSubmit={handelSubmit}>
        <h1>Please fill out the form below to get in touch with us:</h1>
        <input
          type="text"
          name="name"
          id=""
          onChange={handelChange}
          placeholder="Enter Name"
          value={data.name}
        ></input>
        <input
          type="email"
          name="email"
          id=""
          onChange={handelChange}
          placeholder="Enter Email"
          value={data.email}
        ></input>
        <input
          type="phone"
          name="phone"
          id=""
          onChange={handelChange}
          placeholder="Enter Phone-Number"
          value={data.phone}
        ></input>
        <textarea
          name="message"
          id=""
          onChange={handelChange}
          cols="30"
          rows="10"
          placeholder="Enter Message"
          value={data.message}
        ></textarea>
        <button type="submit">send</button>
      </form>
    </>
  );
=======
import React from "react";
import "./Contact.css"
const Contact=()=>{
    return (
        <div className="Contactus">
            <h1>Contact Us</h1>
            <hr/>
            <p>
            Please fill out the form below to get in touch with us:
             </p>
            <form>
                <div >
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" placeholder="Name"></input>
                </div>
                <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" placeholder="Email"></input>
            </div>
                <div>
                <label htmlFor="message">Message:</label>
                <textarea id="message" rows="6" placeholder="Enter your message here"></textarea>
                </div>
                <button>Submit</button>
            </form>
        </div>
    );

    
};

export default Contact;
