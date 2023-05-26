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
  // const post = Array.of(postInfo)[0]
  const post = {
    title: 'Post to test markdown and post screen',
    image:
      'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWF',
    postText: `
    This is a test post just to test all the markdown syntax:
    # Header 1
    ## Header 2
    ### Header 3
    
    One line gap
    
    #### Header 4
    ##### Header 5
    ##### Header 6
    
    > Here is a test blockquote
    
    > And here goes the 2nd one
    
    \`small code sample\` and here is some random text.
    
    * here is the first point
    * here is another point
    * here is one more point
    * and here is the last point
    
    [\`link\`](https://github.com/rehypejs/rehype-highlight).
    
    Some random paragraphs and **bold text** in between, also why not use ~~italic texts~~ also?
    
    ***
    
    The code used in this post is here below
    \`\`\`md
    This is a test post just to test all the markdown syntax:
    # Header 1
    ## Header 2
    ### Header 3
    
    One line gap
    
    #### Header 4
    ##### Header 5
    ##### Header 6
    
    > Here is a test blockquote
    
    > And here goes the 2nd one
    
    \`small code sample\` and here is some random text.
    
    * here is the first point
    * here is another point
    * here is one more point
    * and here is the last point
    
    [\`link\`](https://github.com/rehypejs/rehype-highlight).
    
    Some random paragraphs and **bold text** in between, also why not use ~~italic texts~~ also?
    
    ***
    \`\`\`
    `.toString(),
    author: { name: 'Sobhan Bera' },
    date: '2023/05/26',
  }

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
