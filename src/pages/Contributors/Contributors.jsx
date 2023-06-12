import React, { useState, useEffect } from 'react'
import './contributors.css'

function Contributors() {
  const [contributors, setContributors] = useState([])
  const [initialLoading, setInitialLoading] = useState(true)

  useEffect(() => {
    setInitialLoading(true) // set loading to true when th e fetch request is initiated
    fetch(
      `https://api.github.com/repos/AKD-01/blogweet/contributors?per_page=100`
    )
      .then((response) => response.json())
      .then((data) => {
        setContributors(data)
        setInitialLoading(false) // set loading to false when the fetch request is completed
      })
      .catch((error) => {
        console.log(error)
        setInitialLoading(true) // set loading to false when an error occurs
      })
  }, [])

  return (
    <div>
      {' '}
      <h2 className='contributor-heading'>Meet Our Contributors</h2>
      {initialLoading ? (
        <div className='loading'>Loading...</div>
      ) : (
        <ul className='contributors-list'>
          {contributors.map(
            (contributor) =>
              contributor &&
              contributor.type !== 'Bot' && ( //to remove bot from the contributors list
                <li className='contributor' key={contributor.id}>
                  <a
                    className='contributor-anchor'
                    href={contributor.html_url}
                    target='_blank'
                    title={`${contributor.login}`}
                  >
                    <img
                      alt={contributor.login}
                      className='contributor-image'
                      loading='lazy'
                      src={contributor.avatar_url}
                    />
                  </a>
                </li>
              )
          )}
        </ul>
      )}
    </div>
  )
}

export default Contributors
