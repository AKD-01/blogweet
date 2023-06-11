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
                <button className="cbutton">Submit</button>
            </form>
        </div>
    );

    
};

export default Contact;