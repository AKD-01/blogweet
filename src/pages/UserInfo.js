import React from 'react'
import { useLocation } from 'react-router-dom';
import './UserInfo.css'

const UserInfo = () => {

    const location = useLocation();
    console.log(location.state)
    const user = location.state;

    return (<>
        <div className="card">
            <img src={user.photoUrl} alt={user.name} className="card-img" />
            <div className="card-body">
                <h3 className="card-title">{user.name}</h3>
                <p className="card-text">Email: {user.email}</p>
            </div>
        </div>
        </>
    )
}

export default UserInfo