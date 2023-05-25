import React from "react";
import { useNavigate } from "react-router-dom";
import { signInWithGooglePopup, signInWithGithubPopup } from "../utils/firebase";
import LoginButton from "../components/LoginButton";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

function Login({ setIsAuth }) {
  let navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithGooglePopup().then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
    });
  };
  const signInWithGithub = () => {
    signInWithGithubPopup().then((result) => {
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
        bgColor="#ffffff"
        color="black"
        signIn={signInWithGoogle}
        icon={<FcGoogle />}
      />
      <LoginButton
        label="Continue With Github"
        alt="Github"
        bgColor="#333333"
        color="white"
        signIn={signInWithGithub}
        icon={<FaGithub />}
      />
    </div>
  );
}

export default Login;
