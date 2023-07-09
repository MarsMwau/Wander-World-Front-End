import React from 'react';
import { useNavigate } from "react-router-dom";
import NewPostForm from './NewPostForm';

const NewPost = () => {
  const navigate = useNavigate();
  const handleCreatePost = async (newPost) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ post: newPost }),
      });
      const data = await response.json();
      console.log('Post successfully created:', data);
      navigate("/feed");
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div>
      <h2>Create a New Post</h2>
      <NewPostForm handleCreatePost={handleCreatePost} />
    </div>
  );
};

export default NewPost;
