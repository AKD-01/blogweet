import "./App.css";
import { useState, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {signUserAccountOut} from "./utils/firebase";
import Sidebar from "./components/SideBar/Sidebar";
import SidebarOnDesktop from "./components/SidebarOnDesktop/SidebarOnDesktop";

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const CreatePost = lazy(() => import('./pages/CreatePost'));
const Blogpost = lazy(() => import('./pages/Blogpost'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const UserInfo = lazy(() => import('./pages/UserInfo'));
const NotFound404 = lazy(() => import('./pages/NotFound404'));


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
      {width <= 600 && <Sidebar isAuth={isAuth} signUserOut={signUserOut} />}
      {width > 600 && (
        <SidebarOnDesktop isAuth={isAuth} signUserOut={signUserOut} />
      )}
      <Routes>
        <Route path="/" element={
          <Suspense fallback={<p>Loading</p>}>
            <Home isAuth={isAuth} />
          </Suspense>
        } />
        <Route path="/createpost" element={
          <Suspense fallback={<p>Loading</p>}>
            <CreatePost isAuth={isAuth} />
          </Suspense>
        } />
        <Route path="/about" element={
          <Suspense fallback={<p>Loading</p>}>
            <About />
          </Suspense>
        } />
        <Route path="/contact" element={
          <Suspense fallback={<p>Loading</p>}>
            <Contact />
          </Suspense>
        } />
        <Route path="/login" element={
          <Suspense fallback={<p>Loading</p>}>
            <Login setIsAuth={setIsAuth} />
          </Suspense>
        } />
        <Route path="/user/:username" element={
          <Suspense fallback={<p>Loading</p>}>
            <UserInfo />
          </Suspense>
        } />
        <Route path="/user/:username/:blogname" element={
          <Suspense fallback={<p>Loading</p>}>
            <Blogpost />
          </Suspense>
        } />
        <Route path="*" element={
          <Suspense fallback={<p>Loading</p>}>
            <NotFound404 />
          </Suspense>
        } />
      </Routes>
    </Router>
  );
}

export default App;