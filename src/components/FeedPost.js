import React from 'react';
import PostItem from './PostItem';

const FeedPost = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
};

export default FeedPost;
