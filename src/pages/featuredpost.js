import React, { Component } from "react";
import "./featuredPost.css";

class FeaturedPosts extends Component {
  state = {
    blogPosts: [
      {
        title: "Unleashing the Magic of Generative AI",
        content: "ffffff.",
        author: "Anjali Dubey",
        date: "May 24, 2023"
      },
      {
        title: "Genrative AI : Embracing the Boundless Possibilities",
        content: "dfff",
        author: "Anjali Dubey",
        date: "May 24, 2023"
      },
      {
        title: "Blockchain - The Building Block of Web3",
        content: "ffffffff",
        author: "Anjali Dubey",
        date: "May 24, 2023"
      },
      {
        title: "The Token Economy - Fueling Web3",
        content: "dddd",
        author: "Anjali Dubey",
        date: "May 24, 2023"
      },
      {
        title: "Metaverse : Immersion, Interaction, and Infinite Exploration",
        content: "fff",
        author: "Anjali Dubey",
        date: "May 24, 2023"
      },
      {
        title: "Unraveling the Tapestry of AI and Human Relationships",
        content: "dd",
        author: "Anjali Dubey",
        date: "May 24, 2023"
      },
    ]
  };

  render() {
    return (
      <div>
        <h1>Featured Posts</h1>
        <div id="blog-previews">
          {this.state.blogPosts.map((post) => (
            <div key={post.id} className="blog-preview">
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <span>By {post.author} | {post.date}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default FeaturedPosts;
