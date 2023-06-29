import "./App.css";
import { useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {signUserAccountOut} from "./utils/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Home = lazy(()=>import("./pages/Home"))
const Login = lazy(()=>import("./pages/Login"))
const CreatePost = lazy(()=>import("./pages/CreatePost"))
const Blogpost = lazy(()=>import("./pages/Blogpost"))
const UserInfo = lazy(()=>import("./pages/UserInfo"))
const About = lazy(()=>import("./pages/About"))
const Contact = lazy(()=>import("./pages/Contact"))
const NotFound404 = lazy(()=>import("./pages/NotFound404"))
const Sidebar = lazy(()=>import("./components/SideBar/Sidebar"))
const SidebarOnDesktop = lazy(()=>import("./components/SidebarOnDesktop/SidebarOnDesktop"))

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

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
    <Suspense fallback={<FontAwesomeIcon icon={faSpinner} spin />}>
      {width <= 600 && <Sidebar isAuth={isAuth} signUserOut={signUserOut} />}
      {width > 600 && (
        <SidebarOnDesktop isAuth={isAuth} signUserOut={signUserOut} />
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
      </Suspense>
    </Router>
  );
}

export default App;
