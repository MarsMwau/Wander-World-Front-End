import React, { useEffect, useState } from 'react';
import "./Comments.css"

const Comments = ({ comments, postId, userId }) => {
  const [newComment, setNewComment] = useState('');
  const [updatedComments, setUpdatedComments] = useState([]);

  useEffect(() => {
    setUpdatedComments(comments);
  }, [comments]);

  const handleCommentSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/posts/${postId}/create_comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ comment: { content: newComment } }),
      });
      const data = await response.json();
      // Clear the input field after submitting the comment
      setNewComment('');
      // Fetch the updated comments from the server
      fetchComments();
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const fetchComments = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the authentication token from localStorage
      const response = await fetch(`http://localhost:3000/posts/${postId}/get_comments`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the authentication token in the headers
        },
      });
      const data = await response.json();
      console.log('Fetched comments:', data);
      setUpdatedComments(data || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleCommentDelete = async (commentId) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:3000/posts/${postId}/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });
      // Fetch the updated comments from the server after deleting the comment
      fetchComments();
      // Display a success message to the user
      console.log('Comment deleted successfully');
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };
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

  return (
    <div className="comments-container">
      {updatedComments.map((comment) => (
        <div className="comment" key={comment.id}>
          <p className="comment-date">{formatDateTime(comment.created_at)}</p>
          <p className="comment-content">{comment.content}</p>
          {comment.user_id === userId && (
            <button className="comment-delete" onClick={() => handleCommentDelete(comment.id)}>Delete</button>
          )}
        </div>
      ))}
      <div className="comment-input">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
        />
        <button onClick={handleCommentSubmit}>Post</button>
      </div>
    </div>
  );
};

export default Comments;
