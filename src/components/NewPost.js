import React from 'react';
import { useNavigate } from "react-router-dom";
import NewPostForm from './NewPostForm';
import "./NewPost.css";
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
    <div className="New-Post">
      <NewPostForm handleCreatePost={handleCreatePost} />
    </div>
  );
};

export default NewPost;
