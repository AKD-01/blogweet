import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {signUserAccountOut} from "./utils/firebase";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreatePost from "./pages/CreatePost";
import Sidebar from "./components/SideBar/Sidebar";
import SidebarOnDesktop from "./components/SidebarOnDesktop/SidebarOnDesktop";
import Blogpost from "./pages/Blogpost";
import UserInfo from "./pages/UserInfo";
import About from "./pages/About";
import MoonLoader from "react-spinners/MoonLoader";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const [isLoading, setIsLoading] = useState(true);

  const signUserOut = async () => {
    await signUserAccountOut();
    localStorage.clear();
    setIsAuth(false);
    window.location.pathname = "/login";
  };

  useEffect(() => {
    // Simulating data loading
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  let width = 1000;
  width = window.screen.width;

  return (
    <Router>
      {isLoading ? (
        <div className="centered">
          <MoonLoader/>
        </div>
      ) : (
        <>
          {width < 500 && <Sidebar isAuth={isAuth} signUserOut={signUserOut} />}
          {width > 500 && (
            <SidebarOnDesktop isAuth={isAuth} signUserOut={signUserOut} />
          )}
          <Routes>
            <Route path="/" element={<Home isAuth={isAuth} />} />
            <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
            <Route path="/:username" element={<UserInfo />} />
            <Route path="/:username/:blogname" element={<Blogpost />} />
          </Routes>
        </>
      )}
    </Router>
  );
}

export default App;
