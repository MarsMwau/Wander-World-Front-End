import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import "./SearchPost.css"
import { Avatar } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const SearchPost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

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
          setLoading(false);
        } else {
          console.error('Invalid response: Posts data is not an array');
        }
      }
      catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
  const handleSearch = (searchTerm) => {
    const filteredPosts = posts.filter(
      (post) =>
        post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setPosts(filteredPosts);
  };

  const sortPostsByLikes = () => {
    const sortedPosts = [...posts].sort((a, b) => b.likes - a.likes);
    setPosts(sortedPosts);
  };

  return (
    <div className="search-post">
      <SearchBar handleSearch={handleSearch} />
      <button className="btn" onClick={sortPostsByLikes}>Sort by Likes</button>

      {loading ? (
        <div class="loader">
        <span class="loader-text">loading</span>
          <span class="load"></span>
      </div>
      ) : (
        <div className="post-list">
          {posts.map((post) => (
            <div key={post.id} className="post-card">
              <div className="header">
              <Avatar src={<AccountCircleIcon />} className="post-avatar" />
              <h2>{post.author}</h2>
              </div>
              <p>{post.title}</p>
              {post.image && <img src={post.image} alt="Post" className="post-image" />}
              <div className="footer">
              <p>{post.content}</p>
              <p>Likes: {post.likes}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPost;
