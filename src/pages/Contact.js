import React from "react";
import "./Contact.css";
import {useRef} from "react";
import emailjs from 'emailjs-com';

const Contact=()=>{

    const form = useRef();

    const sendEmail = (e) => {
      e.preventDefault();


    //  YOUR_SERVICE_ID = service_fe7xt7q 
    //  YOUR_TEMPLATE_ID = template_twttpr5
    //  YOUR_PUBLIC_KEY = -hZabQ8Vke9nL6Qvs
  
      emailjs.sendForm('service_fe7xt7q', 'template_twttpr5', form.current, '-hZabQ8Vke9nL6Qvs')
        e.target.reset()
    };
  

    return (
        <div className="Contactus">
            <h1>Contact Us</h1>
            <hr/>
            <p>
            Please fill out the form below to get in touch with us:
             </p>
            <form ref={form} onSubmit={sendEmail}>
                <div >
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
                <button type='submit'>Submit</button>
            </form>
        </div>
    );

    
};

export default Contact;