import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserForm from './UserForm';
import { Avatar } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import "./Userprofile.css"

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const decodedToken = decodeToken(token);
        const userId = decodedToken.user_id;

        const response = await axios.get(`http://localhost:3000/users/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  const decodeToken = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window.atob(base64)
        .split('')
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join('')
    );

    return JSON.parse(jsonPayload);
  };

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
    setEditMode(false);
  };

  const deletePost = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/posts/${postId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove the deleted post from the user's posts
      setUser((prevUser) => ({
        ...prevUser,
        posts: prevUser.posts.filter((post) => post.id !== postId),
      }));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const deleteComment = async (postId, commentId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/posts/${postId}/comments/${commentId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove the deleted comment from the user's posts
      setUser((prevUser) => ({
        ...prevUser,
        posts: prevUser.posts.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              comments: post.comments.filter((comment) => comment.id !== commentId),
            };
          }
          return post;
        }),
      }));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const toggleCommentsVisibility = () => {
    setShowComments(!showComments);
  };
  
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-profile">
    <div className="user-info">
      <div className="user-header">
        <Avatar src={<AccountCircleIcon />} className="user-avatar" />
        <h2>{user.username}</h2>
      </div>
      {editMode ? (
        <UserForm user={user} onUpdate={handleUpdateUser} onCancel={toggleEditMode} />
      ) : (
        <div>
          <div className="user-details">
            <p>Bio: {user.bio}</p>
            <p>Email: {user.email}</p>
            <p>Username: {user.username}</p>
          </div>
          <button className="edit-profile-button" type="button" onClick={toggleEditMode}>
            Edit Profile
          </button>
        </div>
      )}

      <div className="user-posts">
        <h3>Posts</h3>
        <div className="post-grid">
          {user.posts.map((post) => (
            <div key={post.id} className="post-card">
              <button className="delete-post-button" onClick={() => deletePost(post.id)}>
                Delete
              </button>
              <h4>{post.title}</h4>
              {post.image && (
                <img src={post.image} alt="Post" className="post-image" />
              )}
              <p>{post.content}</p>
              <div className="post-stats">
                <div className="likes">{post.likes} Likes</div>
                <div className="comments">
                  <button onClick={toggleCommentsVisibility}>
                    {showComments ? 'Hide Comments' : 'Show Comments'}
                  </button>
                </div>
              </div>
              {showComments && (
                <div className="comments-popup">
                  <h5>Comments:</h5>
                  {post.comments.length === 0 ? (
                    <p>No Comments</p>
                  ) : (
                    post.comments.map((comment) => (
                      <div key={comment.id} className="comment">
                        <p>{comment.content}</p>
                        <p>Created At: {comment.created_at}</p>
                        <button
                          className="delete-comment-button"
                          onClick={() => deleteComment(post.id, comment.id)}
                        >
                          Delete Comment
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
};


export default UserProfile;
