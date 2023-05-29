import React, { useState } from "react";
import { submitFormData } from "../utils/firebase";
import "./Contact.css";

const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const errorsCopy = {};

        if (name.trim() === "") {
            errorsCopy.name = "Name is required!";
        }

        if (email.trim() === "") {
            errorsCopy.email = "Email is required!";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errorsCopy.email = "Invalid email address";
        }

        if (message.trim() === "") {
            errorsCopy.message = "Message is required!";
        }

        setErrors(errorsCopy);

        // Return true if no errors, otherwise false
        return Object.keys(errorsCopy).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            const formData = {
                name: name,
                email: email,
                message: message
            };

            submitFormData(formData);
            setName('');
            setEmail('');
            setMessage('');
            console.log('Form submitted');
        } else {
            console.log('Form contains errors');
        }
    };

    return (
        <div className="Contactus">
            <h1>Contact Us</h1>
            <hr />
            <p>Please fill out the form below to get in touch with us:</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <span className="error">{errors.name}</span>}
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>
                <div>
                    <label htmlFor="message">Message:</label>
                    <textarea
                        id="message"
                        rows="6"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                    {errors.message && <span className="error">{errors.message}</span>}
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Contact;
