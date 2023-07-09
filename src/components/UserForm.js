import React, { useState } from 'react';
import axios from 'axios';

const UserForm = ({ user, onUpdate, onCancel }) => {
  const [updatedUser, setUpdatedUser] = useState({
    bio: user.bio,
    email: user.email,
    username: user.username,
  });

  const handleInputChange = (e) => {
    setUpdatedUser({
      ...updatedUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        `http://localhost:3000/users/${user.id}`,
        { user: updatedUser },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedUser = response.data.user;
      onUpdate(updatedUser);
      console.log(response.data.message);
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label>Bio:</label>
      <textarea
        name="bio"
        value={updatedUser.bio}
        onChange={handleInputChange}
      ></textarea>
      <label>Email:</label>
      <input
        type="email"
        name="email"
        value={updatedUser.email}
        onChange={handleInputChange}
      />
      <label>Username:</label>
      <input
        type="text"
        name="username"
        value={updatedUser.username}
        onChange={handleInputChange}
      />
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default UserForm;
