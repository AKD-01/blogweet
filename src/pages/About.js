import React from 'react'

import styles from '../styles/pages/about.module.scss'

const About = () => {
  return (
    <div className={styles.aboutRoot}>
      <div className={styles.aboutContainer}>
        <h1>ABOUT</h1>

        <p>
          BlogWeet is a social media app that allows users to create, post and
          share their blogs. It is a platform that encourages users to express
          their thoughts, opinions, and perspectives through written content,
          and engage with the content of others. The app is easy to use, and it
          is designed to be accessible to users of all ages and levels of
          technical expertise. Users can create their blogs and post their
          content with just a few clicks.
        </p>

        <p>
          Once a blog post is published, other users can read, and share it.
          This creates a vibrant and dynamic community of users who are
          passionate about sharing and discovering new ideas and perspectives.
          The platform is also searchable, so users can easily find content that
          is relevant to their interests.
        </p>

        <p>
          One of the unique features of BlogWeet is that it allows users to
          build a following by connecting with other users who share similar
          interests. This feature enables users to expand their reach, and
          increase the visibility of their content. Overall, BlogWeet is a great
          platform for users who are looking for an easy, user-friendly way to
          create, post and share their blogs, and engage with a community of
          like-minded individuals. Whether you're a blogger looking to expand
          your reach, or a reader looking for new perspectives, BlogWeet is the
          perfect platform for you.
        </p>

        <p>
          In terms of security, BlogWeet provides robust security features to
          ensure that users' data is protected. The platform uses google’s
          encryption to secure user data and also uses advanced security
          measures to protect against hacking and other malicious activities.
        </p>

        <p>
          Overall, BlogWeet is a versatile and feature-rich social media app
          that provides users with a platform to create, post, and share their
          blogs. With its focus on user-generated content, BlogWeet is a vibrant
          and dynamic community where ideas and perspectives are shared and
          explored.
        </p>

        <div className={styles.socials}>
          <a href="https://github.com/AKD-01/blogweet">
            <i class="bx bxl-github"></i>

            <span>GitHub</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default About
