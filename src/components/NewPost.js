import React, { useState } from "react";
function NewPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);
    try {
      const response = await fetch("http://localhost:3000/posts", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        // Post created successfully
        console.log("New post created!");
        // Reset form fields
        setTitle("");
        setContent("");
        setImage(null);
      } else {
        // Error in creating post
        const data = await response.json();
        console.error("Failed to create post:", data.errors);
      }
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };
  return (
    <div>
      <h1>Create a New Post</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          Content:
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
        </label>
        <label>
          Image:
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        </label>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}
export default NewPost;
