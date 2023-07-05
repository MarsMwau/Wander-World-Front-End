import React from 'react';

const Post = ({ post }) => {
  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.caption}</p>
      <img src={post.image_url} alt="Post" />
    </div>
  );
};

export default Post;
