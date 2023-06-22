import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
  const [darkMode, setDarkMode] = useState(false);

  const signUserOut = async () => {
    await signUserAccountOut();
    localStorage.clear();
    setIsAuth(false);
    window.location.pathname = "/login";
  };

  let width = 1000;
  width = window.screen.width;

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);

    document.body.classList.toggle("dark-mode");

    const sidebar = document.querySelector(".Sidebar");
    if (sidebar) {
      sidebar.classList.toggle("dark-mode");
    }

    const sidebarOnDesktop = document.querySelector(".SidebarOnDesktop");
    if (sidebarOnDesktop) {
      sidebarOnDesktop.classList.toggle("dark-mode");
    }

    const homeContent = document.querySelector(".home_content");
    if (homeContent) {
      homeContent.classList.toggle("dark-mode");
    }

    const textElements = document.querySelectorAll(".text");
    if (textElements) {
      textElements.forEach((text) => text.classList.toggle("dark-mode"));
    }

    const postElements = document.querySelectorAll(".post");
    if (postElements) {
      postElements.forEach((post) => post.classList.toggle("dark-mode"));
    }

    const title = document.querySelector(".logoname");
    if (title) {
      title.classList.toggle("dark-mode");
    }

    const postHeadings = document.querySelectorAll(".post h3");
    if (postHeadings) {
      postHeadings.forEach((heading) => heading.classList.toggle("dark-mode"));
    }
  };

  return (
    <Router>
      <div className={darkMode ? "dark-mode" : ""}>
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
          <Route path="/" element={<Home isAuth={isAuth} />} />
          <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
          <Route path="/user/:username" element={<UserInfo />} />
          <Route path="/user/:username/:blogname" element={<Blogpost />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </div>
      <div className="dark-mode-toggle" onClick={toggleDarkMode}>
        <i className={`bx ${darkMode ? "bx-sun" : "bx-moon"}`} />
      </div>
    </Router>
  );
}

export default App;
