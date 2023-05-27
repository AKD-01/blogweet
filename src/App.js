import './App.css'
import './styles/theming.scss'
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { signUserAccountOut } from './utils/firebase'
import Home from './pages/Home'
import Login from './pages/Login'
import CreatePost from './pages/CreatePost'
import Sidebar from './components/SideBar/Sidebar'
import SidebarOnDesktop from './components/SidebarOnDesktop/SidebarOnDesktop'
import Blogpost from './pages/Blogpost'
import UserInfo from './pages/UserInfo'
import About from './pages/About'
import { Header } from './components/Header'
import Contact from './pages/Contact'
import NotFound404 from './pages/NotFound404'

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'))

  const signUserOut = () => {
    // we must ask for confirmation before logging out
    // it might happen that the user have clicked logout button by mistake
    if (window.confirm('Are you sure you want to logout?')) {
      signUserAccountOut().then(() => {
        localStorage.clear()
        setIsAuth(false)
        window.location.pathname = '/login'
      })
    }
  }
  let width = 1000
  width = window.screen.width

  return (
    <Router>
      <Header
        headerShouldBeLarge={['/createpost'].includes(window.location.pathname)}
        isAuth={isAuth}
        signUserOut={signUserOut}
      />

      {/* previous navigation options are listed below */}
      {width < 500 && <Sidebar isAuth={isAuth} signUserOut={signUserOut} />}
      {width > 500 && (
        <SidebarOnDesktop isAuth={isAuth} signUserOut={signUserOut} />
      )}

      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route
          path="/createpost"
          element={<CreatePost isAuth={isAuth} signUserOut={signUserOut} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/user/:username" element={<UserInfo />} />
        <Route path="/user/:username/:blogname" element={<Blogpost />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </Router>
  )
}

export default App
