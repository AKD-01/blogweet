import { useState } from 'react'
import styles from '../../styles/components/header.module.scss'
import { useLocation } from 'react-router-dom'

export function Header({ headerShouldBeLarge, isAuth, signUserOut }) {
  const location = useLocation()

  // toggle for showing menu
  const [showMenu, setShowMenu] = useState(false)

  /**
   * disable scroling when any kind of meny is opened
   * this useEffect will do the same
   *
   * this will be perfomed in toggleMenu function instead of
   * above useEffect for much more elegant state and scroll control
   */
  const toggleMenu = () =>
    setShowMenu(value => {
      // if menu is enabled then disable the scrolling in body
      if (!value) document.body.style.overflow = 'hidden'
      // else enable it
      else document.body.style.overflow = 'scroll'

      return !value
    })

  // only show header in createpost screen
  if (location.pathname !== '/createpost') {
    return null
  }

  return (
    <header className={styles.headerRoot}>
      <div
        className={`${styles.headerContainer} ${
          headerShouldBeLarge ? styles.largeHeader : styles.null
        }`}>
        <div className={styles.headerTitleContainer}>
          <p>
            <a href={'/'}>Blogweet</a>
          </p>
        </div>

        <nav
          className={`${styles.headerNavigation} ${
            showMenu ? styles.active : styles.inactive
          }`}>
          <ul>
            <li>
              <a href={'/'}>Home</a>
            </li>

            <li>
              <a href={'/about'}>About</a>
            </li>

            <li>
              <a href={'/createpost'}>Create Post</a>
            </li>

            {isAuth && (
              <li>
                <i
                  className="bx bx-log-out"
                  id="log_out"
                  onClick={signUserOut}
                />
              </li>
            )}
          </ul>
        </nav>

        <div className={styles.menuButton} onClick={toggleMenu}>
          <svg
            className={showMenu ? styles.active : styles.inactive}
            // width="100"
            // height="64"
            viewBox="0 0 100 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="6" rx="3" />
            <rect y="29" width="100" height="6" rx="3" />
            <rect y="58" width="53" height="6" rx="3" />
          </svg>
        </div>
      </div>
    </header>
  )
}
