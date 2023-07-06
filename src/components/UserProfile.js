import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const decodedToken = decodeToken(token);
        const userId = decodedToken.user_id;

        const response = await axios.get(`http://localhost:3000/users/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
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
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`).join(''));

    return JSON.parse(jsonPayload);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{user.username}</h2>
      <p>Email: {user.email}</p>
      <h3>Posts</h3>
      {user.posts.map((post) => (
        <div key={post.id}>
          <h4>{post.title}</h4>
          <p>{post.content}</p>
          {post.image && <img src={post.image.url} alt="Post" />}
          <p>Comments: {post.comments.length}</p>
          <p>Likes: {post.likes.length}</p>
        </div>
      ))}
    </div>
  );
};

export default UserProfile;
