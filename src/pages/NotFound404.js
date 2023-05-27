import React from 'react'
import { Link } from 'react-router-dom'
import './About.css'
import './error.css'

const NotFound404 = () => {
  return (
    <div id="error-page" className="AboutPage">
      <div className="content">
        <h2 className="header" data-text="404">
          404
        </h2>
        <h4 data-text="Opps! Page not found">Opps! Page not found</h4>
        <p className="p">Sorry, the page you're looking for doesn't exist.</p>
        <div className="btns">
          <Link to="/">return home</Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound404
