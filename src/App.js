import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { signUserAccountOut } from "./utils/firebase";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreatePost from "./pages/CreatePost";
import Sidebar from "./components/SideBar/Sidebar";
import SidebarOnDesktop from "./components/SidebarOnDesktop/SidebarOnDesktop";
import Blogpost from "./pages/Blogpost";
import UserInfo from "./pages/UserInfo";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound404 from "./pages/NotFound404";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const [darkMode, setdarkMode] = useState(false);
  const toggleMode = () => {
    setdarkMode(!darkMode);
  };

  document.body.style.backgroundColor = `${darkMode ? "#272631" : "#bcb9d6"}`;

  const signUserOut = async () => {
    await signUserAccountOut();
    localStorage.clear();
    setIsAuth(false);
    window.location.pathname = "/login";
  };
  let width = 1000;

  width = window.screen.width;

  return (
    <Router>
      {width <= 600 && (
        <Sidebar
          isAuth={isAuth}
          signUserOut={signUserOut}
          darkMode={darkMode}
        />
      )}
      {width > 600 && (
        <SidebarOnDesktop
          isAuth={isAuth}
          signUserOut={signUserOut}
          darkMode={darkMode}
        />
      )}
      <Routes>
        <Route
          path="/"
          element={<Home isAuth={isAuth} darkMode={darkMode} />}
        />
        <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
        <Route path="/about" element={<About darkMode={darkMode} />} />
        <Route path="/contact" element={<Contact darkMode={darkMode} />} />

        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route
          path="/user/:username"
          element={<UserInfo darkMode={darkMode} />}
        />
        <Route
          path="/user/:username/:blogname"
          element={<Blogpost darkMode={darkMode} />}
        />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
      <FontAwesomeIcon
        icon={darkMode ? faSun : faMoon}
        size="xl"
        style={{
          position: "absolute",
          right: "7px",
          top: "10px",
          marginTop: "10px",
          color: `${darkMode ? "white" : "black"}`,
          cursor: "pointer",
          padding: "15px",
          backgroundColor: `${darkMode ? "black" : "#9e9bbb"}`,
          borderRadius: "10px",
        }}
        onClick={toggleMode}
      />
    </Router>
  );
}

export default App;
