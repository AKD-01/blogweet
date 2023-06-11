import React from "react";
import "./Contact.css";
const Contact = () => {
  return (
    <div style={{ marginLeft: "18%" }}>
           {" "}
      <center>
                <h1 className="contact-heading">Contact US</h1>     {" "}
      </center>
            <hr style={{ marginRight: "10%",marginTop:"-25px" }} />     {" "}
      <div className="contact-form">
               {" "}
        <center>
          <p className="form-heading">
            Please fill out the form below to get in touch with us
          </p>
        </center>
                <hr style={{ marginBottom: "25px" }} />       {" "}
        <label>Name</label> <br />
                <input type="text" placeholder="Name" />       {" "}
        <label>Email</label> <br />
                <input type="email" placeholder="Email" />       {" "}
        <label>Message</label> <br />       {" "}
        <textarea
          cols="30"
          rows="6"
          placeholder="Enter you Message here"
        ></textarea>
               {" "}
        <center>
          <button className="btn-submit">Submit</button>
        </center>
             {" "}
      </div>
         {" "}
    </div>
  );
};

export default Contact;
