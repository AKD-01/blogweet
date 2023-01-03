import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreatePost from "./pages/CreatePost";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };

  return (
    <Router>
      <nav>
        <Link to="/">
          <div className="HomeLink">BlogWeet</div>{" "}
        </Link>
        {isAuth ? (
          <>
            <Link to="/createpost">
              <div className="CreatePost"> Create Post</div>{" "}
            </Link>
            <button onClick={signUserOut}>
              <div> Log Out</div>
            </button>
          </>
        ) : (
          <Link to="/login">
            <div className="Link"> Login </div>
          </Link>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
      </Routes>
    </Router>
  );
}

export default App;

// line 35, 36, 37: passing state as a prop in the respective components.
