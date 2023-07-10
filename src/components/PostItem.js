import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Comments from './Comments';
import { Avatar } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import './PostItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSolidFaHeart, faHeart } from '@fortawesome/free-solid-svg-icons';


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
    return <h1>Loading...</h1>
    ;
  }

  return (
    <div className="post">
      <div className="post__container">
        <div className="post__info">
          <div className="post__header">
            <Avatar src={<AccountCircleIcon />} className="post-avatar" />
            <h2>{post.author}  </h2>
            <p>  {formatDateTime(post.created_at)}</p>
          </div>
          <div className="post__details">
            <h3>{post.title}</h3>
            {post.image && <img src={post.image} alt="Post" />}
            <p>{post.content}</p>
          </div>
        </div>

        <div className="post__options">
          <div className="post__option-like">
            <button onClick={handleLikeUnlike}>{liked ? <faHeart /> : <faSolidFaHeart />}</button>
            <p>{likeCount}</p>
          </div>
          <div className="post__option-comment">
            <button onClick={toggleComments}>
              {showComments ? <faSolidFaComment /> : <faLightFaComment  />}
            </button>
            {/* {showComments && (
              <div className="comments-popup">
                <Comments comments={post.comments} postId={post.id} userId={post.userId} />
              </div>
            )} */}
            <div className={`comments-popup ${showComments ? 'show' : ''}`}>
              <Comments comments={post.comments} postId={post.id} userId={post.userId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
