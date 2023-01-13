import React from "react";
import { auth, provider } from "../firebase-config";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import LoginButton from "../components/LoginButton";
import GithubLogo from '../assets/svg-icons/github.svg'
import GoogleLogo from "../assets/svg-icons/google.svg";

function Login({ setIsAuth }) {
  let navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
    });
  };
  const signInWithGithub = () => {
    signInWithPopup(auth, new GithubAuthProvider()).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
    });
  };

  return (
    <div className="loginPage">
      <p>Enter into BlogWeet</p>
      <LoginButton
        label="Continue With Google"
        alt="Google"
        bgColor="#8ab4f8"
        altColor="#8ab4f8"
        signIn={signInWithGoogle}
        image="bx bxl-google bx-tada"
      />
      <LoginButton
        label="Continue With Github"
        alt="Github"
        bgColor="rgb(145, 151, 157)"
        altColor="#f0f6fc"
        signIn={signInWithGithub}
        image="bx bxl-github bx-tada"
      />
      {/* <button className="login-with-google-btn" onClick={signInWithGoogle}>
        Sign in with Google
      </button> */}
    </div>
  );
}

export default Login;