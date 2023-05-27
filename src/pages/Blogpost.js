import { getPostsFromDb } from '../utils/firebase'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import styles from '../styles/pages/blogpost.module.scss'
import 'react-toastify/dist/ReactToastify.css'

import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { LightMarkdownTheme } from '../theme/BlogMarkdownTheme'
import markdownStyles from '../styles/markdown.module.scss'
import SyntaxHighlighter from 'react-syntax-highlighter'

const Blogpost = () => {
  const postId = useParams()
  const [postLists, setPostList] = useState([])
  useEffect(() => {
    const getPosts = async () => {
      const data = await getPostsFromDb()
      setPostList(data)
    }

    getPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const navigate = useNavigate()

  const sharingHandler = s => {
    navigator.clipboard.writeText(`https://blogweet.vercel.app${s}`)
    toast(`Your link has been pasted to your Clipboard. Enjoy!`)
  }
  const postInfo = postLists.filter(x => x.id === postId.blogname)[0]
  console.log(Array.of(postInfo)[0])
  const post = Array.of(postInfo)[0]

  return (
    <div className={styles.blogpostRoot}>
      {post && (
        <div className={styles.blogContainer}>
          <div className={styles.blogImage}>
            <img src={post.image} alt={post.title} />
          </div>

          <div className={styles.blogTitle}>
            <h1>{post.title}</h1>

            <i
              className="bx bxs-share-alt"
              onClick={() =>
                sharingHandler(
                  `/${post.author.name.replaceAll(' ', '-')}/${post.id}`,
                )
              }></i>
          </div>

          <div className={styles.blogPublisher}>
            <p
              className={styles.authorAndDate}
              style={{ cursor: 'pointer' }}
              onClick={e => {
                e.stopPropagation() // will not send click event to parents

                navigate(`/${post.author.name.replaceAll(' ', '-')}`, {
                  state: post.author,
                })
              }}>
              Published by <span>{post.author.name}</span> on 📅 {post.date}
            </p>
          </div>

          <div className={styles.blogContent}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              className={`${markdownStyles.markdown} ${styles.mardownPostPreview}`}
              components={{
                pre({ children }) {
                  return <>{children}</>
                },
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '')

                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={LightMarkdownTheme}
                      language={match[1]}
                      PreTag="p"
                      {...props}>
                      {String(children).replace(/\n$/, '')}{' '}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  )
                },

                p({ children }) {
                  return <p>{children}</p>
                },

                strong({ children }) {
                  return <strong>{children}</strong>
                },

                a({ href, children }) {
                  return (
                    <a href={String(href)} rel="noreferrer" target="_blank">
                      {children}
                    </a>
                  )
                },

                table({ children }) {
                  return <table>{children}</table>
                },
              }}>
              {post.postText}
            </ReactMarkdown>
          </div>
        </div>
      )}

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
    </div>
  )
}

export default Blogpost
