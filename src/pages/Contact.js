import React from "react";
import "./Contact.css"
const Contact=()=>{
    return (
        <div className="Contactus">
            <h1>Contact Us</h1>
            <hr/>
            <div className="contact">
            
                <form>
                <p>
                Please fill out the form below to get in touch with us:
                </p>
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

                <div className="social">
                    <ul className="icons">
                        <li >
                            <a target="_blank" href="#" class="facebook"><i class="fa-brands fa-facebook-f"></i> facebook</a>
                        </li>                    
                        <li>
                            <a target="_blank" href="#" class="instagram"><i class="fa-brands fa-instagram"></i>instagram</a>
                        </li>
                        <li>
                            <a target="_blank" href="#" class="youtube"><i class="fa-brands fa-youtube"></i>youtube</a>
                        </li>
                        <li>
                            <a target="_blank" href="#" class="linkedin"><i class="fa-brands fa-linkedin-in"></i> linkedin</a>
                        </li>
                        <li>
                            <a target="_blank" href="#" class="twitter"><i class="fa-brands fa-twitter"></i> twitter</a>
                        </li>
                        <li>
                            <a target="_blank" href="https://github.com/AKD-01/blogweet" class="github"><i class="fa-brands fa-github"></i> github</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        
        // <div className="social">
        //     <h1>hello</h1>
        // </div>

        
    );

    
};

export default Contact;