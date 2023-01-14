import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css'
import { auth } from "../../firebase-config";
import { signOut } from "firebase/auth";


const Navbar = ({isAuth, setIsAuth}) => {
  function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }
  //   const signUserOut = () => {
  //   signOut(auth).then(() => {
  //     localStorage.clear();
  //     setIsAuth(false);
  //     window.location.pathname = "/login";
  //   });
  // };

  return (
    <div>
      <div className="topnav" id="myTopnav">
        <Link to="/" className="ahref" className="active">
          Home <i className="fa fa-home" aria-hidden="true"></i>
        </Link>
        <Link to='/contact' className="ahref">
          Contact <i className="fa fa-envelope"></i>
        </Link>
        <Link to='/about' className="ahref">
          About <i className="fa fa-user"></i>
        </Link>
        <div className="right-lnk">
          <Link to='/login' className="ahref">Login / Signup</Link>
        </div>
        <Link href={()=>void(0)} className="icon" onclick={myFunction}>
          <i className="fa fa-bars"></i>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
