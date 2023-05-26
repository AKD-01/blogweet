import React from 'react'
import { useLocation } from 'react-router-dom'
// import "./UserInfo.css";
import styles from '../styles/pages/userinfo.module.scss'

const UserInfo = () => {
  const location = useLocation()
  console.log(location.state)
  const user = location.state

  return (
    <div className={styles.userInfoRoot}>
      <div className={styles.userInfoCard}>
        <img src={user.photoUrl} alt={user.name} className="card-img" />

        <div className={styles.userInfoDetail}>
          <h3 className="card-title">{user.name}</h3>
          <p className="card-text">
            <a href={`mailto:${user.email}`}>{user.email}</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default UserInfo
