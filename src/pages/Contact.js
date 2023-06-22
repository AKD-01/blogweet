import React from "react";
import "./Contact.css";
import { getDatabase, ref, push, set } from "firebase/database";
import { useState } from "react";
const Contact=()=>{
    const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  function writeUserData(name, email, message) {
    const db = getDatabase();
    const usersRef = ref(db, 'users');
    const newUserRef = push(usersRef);

    set(newUserRef, {
      username: name,
      email: email,
      message: message
    })
    .then(() => {
      setName('');
      setEmail('');
      setMessage('');
    })
    .catch((error) => {
      console.log('Error writing data:', error);
    });
  }
    return (
        <div className="Contactus">
            <h1>Contact Us</h1>
            <hr/>
            <p>
            Please fill out the form below to get in touch with us:
             </p>
            <form onSubmit={(e) =>{
              e.preventDefault();
              writeUserData(name, email, message);
            }}>
                <div >
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}/>
                </div>
                <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" placeholder="Email"value={email}
                onChange={(e) => setEmail(e.target.value)}/>
            </div>
                <div>
                <label htmlFor="message">Message:</label>
                <textarea id="message" rows="6" placeholder="Enter your message here"value={message}
                onChange={(e) => setMessage(e.target.value)}/>
                </div>
                <button className="cbutton">Submit</button>
            </form>
        </div>
    );

    
};

export default Contact;