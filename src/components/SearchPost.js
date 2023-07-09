import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';

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
    <div>
      <SearchBar handleSearch={handleSearch} />
      <button onClick={sortPostsByLikes}>Sort by Likes</button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        posts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>Author: {post.author}</p>
            {post.image && <img src={post.image} alt="Post" />}
            <p>Likes: {post.likes}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default SearchPost;
