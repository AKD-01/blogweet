import React from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithGooglePopup, signInWithGithubPopup } from '../utils/firebase'
import LoginButton from '../components/LoginButton'
import styles from '../styles/pages/login.module.scss'

function Login({ setIsAuth }) {
  let navigate = useNavigate()

  const signInWithGoogle = () => {
    signInWithGooglePopup().then(result => {
      localStorage.setItem('isAuth', true)
      setIsAuth(true)
      navigate('/')
    })
  }
  const signInWithGithub = () => {
    signInWithGithubPopup().then(result => {
      localStorage.setItem('isAuth', true)
      setIsAuth(true)
      navigate('/')
    })
  }

  return (
    <div className={styles.loginRoot}>
      <p>Enter into BlogWeet</p>

      <LoginButton
        label="Continue With Google"
        alt="Google"
        bgColor="#8ab4f8"
        altColor="#8ab4f8"
        signIn={signInWithGoogle}
        image="bx bxl-google bx-flip-horizontal bx-burst"
      />

      <LoginButton
        label="Continue With Github"
        alt="Github"
        bgColor="rgb(145, 151, 157)"
        altColor="#f0f6fc"
        signIn={signInWithGithub}
        image="bx bxl-github bx-tada"
      />
    </div>
  )
}

export default Login
