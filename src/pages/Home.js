/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { getPostsFromDb, deletePostFromDb } from '../utils/firebase'
import { auth } from '../utils/firebase'
import styles from '../styles/pages/home.module.scss'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'

function Home({ isAuth }) {
  const [postLists, setPostList] = useState([])
  const deletePost = async id => {
    await deletePostFromDb(id)
    window.location.reload()
  }

  // const DUMMY_POST = {
  //   id: `id:${Math.random()}`,
  //   title: "Dummy Post",
  //   author: { name: "Dummy Author", id: Math.random() },
  //   key: Math.random(),
  //   postText: "Hi how are you dummy man",
  //   image: "https://avatars.githubusercontent.com/in/8329?s=80&v=4",
  // };
  // postLists.push(DUMMY_POST);
  useEffect(() => {
    const getPosts = async () => {
      const data = await getPostsFromDb()
      setPostList(data)
      console.log(data)
    }

    getPosts()
  }, [])
  const navigate = useNavigate()
  const sharingHandler = s => {
    // console.log(`https://blogweet.vercel.app${s}`);
    navigator.clipboard.writeText(`https://blogweet.vercel.app${s}`)
    toast(`Your link has been pasted to your Clipboard. Enjoy!`)
  }

  const [showScrollToTop, setShowScrollToTop] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setShowScrollToTop(true)
      } else {
        setShowScrollToTop(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className={styles.homeRoot}>
      <div className={styles.homeContainer}>
        {postLists.map(post => {
          return (
            <div
              className={styles.postCard}
              key={post.id}
              onClick={() => {
                navigate(
                  `/${post.author.name.replaceAll(' ', '-')}/${post.id}`,
                  { state: post },
                )
              }}>
              <div className={styles.postLeft}>
                <img src={post.image} />
              </div>

              <div className={styles.postRight}>
                <p className={styles.title}>{post.title}</p>

                <p className={styles.desc}>
                  {/* we should show 120 characters only... 200 seems very long */}
                  {post.postText.substr(
                    0,
                    Math.min(post.postText.length, 120),
                  ) + '...'}
                </p>

                <p
                  className={styles.authorAndDate}
                  style={{ cursor: 'pointer' }}
                  onClick={e => {
                    e.stopPropagation() // will not send click event to parents

                    navigate(`/${post.author.name.replaceAll(' ', '-')}`, {
                      state: post.author,
                    })
                  }}>
                  Published by <span>{post.author.name}</span> on {post.date}
                </p>

                <div className={styles.actions}>
                  {isAuth &&
                    auth.currentUser != null &&
                    post.author.id === auth.currentUser.uid && (
                      <i
                        onClick={e => {
                          e.stopPropagation() // will not send click event to parents

                          deletePost(post.id)
                        }}
                        className="bx bxs-message-square-x"></i>
                    )}

                  <i
                    className="bx bxs-share-alt"
                    onClick={e => {
                      e.stopPropagation() // will not send click event to parents

                      sharingHandler(
                        `/${post.author.name.replaceAll(' ', '-')}/${post.id}`,
                      )
                    }}></i>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      {/* Scroll-to-top button */}
      {showScrollToTop && (
        <button
          className={styles.gotoTopBtn}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          title="Scroll to top">
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      )}
    </div>
  )

  return (
    <>
      <div className="homePage">
        {postLists.map(post => {
          // console.log(post);
          return (
            <div className="post" key={post.id}>
              <div className="postHeader">
                <div>
                  <h1 className="title" onClick={() => {}}>
                    {' '}
                    {post.title}
                  </h1>
                  {/* </Link> */}
                </div>
              </div>
              <div className="contents">
                <div className="imageCont">
                  <img src={post.image} alt={post.title} />
                </div>
                <div className="postTextContainer">
                  <div style={{ height: '70px', overflow: 'hidden' }}>
                    {post.postText.substr(
                      0,
                      Math.min(post.postText.length, 200),
                    )}
                    &nbsp;&nbsp;{' '}
                  </div>
                  <div
                    style={{
                      textAlign: 'right',
                      color: '#3a363d',
                      fontSize: '.9rem',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      navigate(
                        `/${post.author.name.replaceAll(' ', '-')}/${post.id}`,
                        { state: post },
                      )
                    }}>
                    ......Read More
                  </div>
                </div>
              </div>
              <h3>
                <div>📅{post.date}</div>
                <div
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    navigate(`/${post.author.name.replaceAll(' ', '-')}`, {
                      state: post.author,
                    })
                  }}>
                  👤{post.author.name}
                </div>
              </h3>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Home
