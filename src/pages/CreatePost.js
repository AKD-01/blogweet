import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

import { LightMarkdownTheme } from '../theme/BlogMarkdownTheme'
import markdownStyles from '../styles/markdown.module.scss'
import styles from '../styles/pages/createpost.module.scss'
import { addPostToDb } from '../utils/firebase'

function CreatePost({ isAuth }) {
  const [title, setTitle] = useState('')
  const [postText, setPostText] = useState('')
  const [image, setImage] = useState('')

  let navigate = useNavigate()

  const createPost = async () => {
    if (title.length > 100) {
      alert('Please make sure that your title is less than 100 characters.')
    } else if (postText.length > 10000) {
      alert('Please make sure that your post is less than 10000 characters.')
    } else if (image.length > 100) {
      alert(
        'Please make sure that your image link is less than 100 characters.',
      )
    } else if (
      title.length === 0 ||
      postText.length === 0 ||
      !postText ||
      !title
    ) {
      alert('Please make sure that you have filled all the fields.')
    } else {
      await addPostToDb(title, postText, image)
      navigate('/')
    }
  }

  useEffect(() => {
    if (!isAuth) {
      navigate('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={styles.createPostRoot}>
      <div className={styles.createPostContainer}>
        <div className={styles.createPostHeader}>
          <p>Create New Post</p>

          <p onClick={createPost}>Publish</p>
        </div>

        <div className={styles.postInputs}>
          <input
            maxLength={100}
            placeholder="Enter your post's title - What I learned today."
            value={title}
            onChange={event => {
              setTitle(event.target.value)
            }}
          />

          <textarea
            maxLength={10000}
            placeholder="Write something to post - Today I learned about something new in web development."
            value={postText}
            onChange={event => {
              setPostText(event.target.value)
            }}
          />

          <input
            maxLength={100}
            placeholder="Image link (prefered - 1200x630px) - https://example.com/somepath/image.png"
            value={image}
            onChange={e => {
              setImage(e.target.value)
            }}
          />
        </div>
      </div>

      <div className={styles.postPreviewContainer}>
        <div className={styles.postPreviewHeader}>
          <p>Post Preview</p>
        </div>

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
          }}
          children={
            image && title
              ? `# ${title} \n ![image](${image}) \n ${postText}`
              : title
              ? `# ${title} \n ${postText}`
              : image
              ? `![image](${image}) \n ${postText}`
              : postText
          }>
          {/* {render image in markdown here is provided} */}
          {/* {image ? `![image](${image}) \n ${postText}` : postText} */}
          {/* {postText} */}
        </ReactMarkdown>
      </div>
    </div>
  )
}

export default CreatePost
