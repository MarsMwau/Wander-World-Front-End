import React, { useState } from 'react';
import "./NewPostForm.css";

const NewPostForm = ({ handleCreatePost }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      title,
      content,
      image,
    };

    handleCreatePost(newPost);
  };

  return (
    <div className="new-post-form">
      <span class="card__title">Create a New Post </span>
    <p class="card__content">What is on your mind...</p>
    <form className="card__form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
      type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
      ></textarea>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="Image URL"
      />
      <button type="submit">Create Post</button>
    </form>
  </div>

  );
};

export default NewPostForm;
