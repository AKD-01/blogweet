import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreatePost from "./pages/CreatePost";
import Sidebar from "./components/SideBar/Sidebar";
import SidebarOnDesktop from "./components/SidebarOnDesktop/SidebarOnDesktop";
import Blogpost from "./pages/Blogpost";
import UserInfo from "./pages/UserInfo";
import About from "./pages/About";
import NotFound404 from "./pages/NotFound404";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };
  let width = 1000;

  width = window.screen.width;

  return (
    <Router>
      {width < 500 && <Sidebar isAuth={isAuth} signUserOut={signUserOut} />}
      {width > 500 && (
        <SidebarOnDesktop isAuth={isAuth} signUserOut={signUserOut} />
      )}
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/user/:username" element={<UserInfo />} />
        <Route path="/user/:username/:blogname" element={<Blogpost />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </Router>
  );
}

export default App;
