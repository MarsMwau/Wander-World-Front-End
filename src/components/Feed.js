import React, { useEffect, useState } from 'react';
import FeedPost from './FeedPost';
import "./Feed.css"

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch('http://localhost:3000/posts', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          console.error('Invalid response: Posts data is not an array');
        }
      }
      catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="feed">
      {posts.length > 0 ? (
        <FeedPost posts={posts} />
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};

export default Feed;
