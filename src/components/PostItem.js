import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Comments from './Comments';

const PostItem = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [liked, setLiked] = useState(post.liked_by_current_user);
  const [likeCount, setLikeCount] = useState(post.likes);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:3000/posts/${post.id}/get_comments`);
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    fetchComments();
  }, [post]);

  const toggleComments = () => {
    setShowComments(!showComments);
  };


  const handleLike = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:3000/posts/${post.id}/like`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { message, post: updatedPost, liked_by_current_user } = response.data;
      setLiked(liked_by_current_user);
      setLikeCount(updatedPost.likes);
      console.log(message);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleUnlike = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:3000/posts/${post.id}/unlike`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { message, post: updatedPost, liked_by_current_user } = response.data;
      setLiked(liked_by_current_user);
      setLikeCount(updatedPost.likes);
      console.log(message);
    } catch (error) {
      console.error('Error unliking post:', error);
    }
  };

  const handleLikeUnlike = () => {
    if (liked) {
      handleUnlike();
    } else {
      handleLike();
    }
  };

  useEffect(() => {
    setLiked(post.liked_by_current_user);
    setLikeCount(post.likes);
  }, [post.liked_by_current_user, post.likes]);

  const formatDate = (dateString) => {
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    };
    return new Date(dateString).toLocaleString('en-GB', options);
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const formattedDate = date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    return `${hours}:${minutes} ${formattedDate}`;
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>{post.author}</p>
      <p>{formatDateTime(post.created_at)}</p>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      {post.image && <img src={post.image} alt="Post" />}
      <p>Likes: {likeCount}</p>
      <button onClick={handleLikeUnlike}>{liked ? 'Unlike' : 'Like'}</button>
      <button onClick={toggleComments}>
        {showComments ? 'Hide Comments' : 'Show Comments'}
      </button>

      {showComments && <Comments
      comments={post.comments} 
      postId={post.id}
      userId={post.userId} />}

    </div>
  );
};

export default PostItem;
