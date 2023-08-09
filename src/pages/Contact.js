import React from "react";
import "./Contact.css";

const Contact = () => {
    return (
        <div className="container">
            <div className="contactForm">
                <h1>Contact Us</h1>
                <hr />
                <p>Please fill out the form below to get in touch with us:</p>
                <form>
                    <div className="df-flex">
                        <label htmlFor="name" style={{ fontWeight: "bold" }}>Name:</label>
                        <input type="text" id="name" placeholder="Name"></input>
                    </div>
                    <div className="df-flex">
                        <label htmlFor="email" style={{ fontWeight: "bold" }}>Email:</label>
                        <input type="email" id="email" placeholder="Email"></input>
                    </div>
                    <div className="df-flex">
                        <label htmlFor="message" style={{ fontWeight: "bold" }}>Message:</label>
                        <textarea id="message" rows="6" placeholder="Enter your message here"></textarea>
                    </div>
                    <button>Submit</button>
                </form>
            </div>
        </div>
    );


};

export default Contact;