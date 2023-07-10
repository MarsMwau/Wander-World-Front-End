import React, { useState } from 'react';
import axios from 'axios';
import "./UserForm.css"

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
    <form className="user-form" onSubmit={handleFormSubmit}>
      <label className="form-label">Bio:</label>
      <textarea
        className="form-input"
        name="bio"
        value={updatedUser.bio}
        onChange={handleInputChange}
      ></textarea>
      <label className="form-label">Email:</label>
      <input
        className="form-input"
        type="email"
        name="email"
        value={updatedUser.email}
        onChange={handleInputChange}
      />
      <label className="form-label">Username:</label>
      <input
        className="form-input"
        type="text"
        name="username"
        value={updatedUser.username}
        onChange={handleInputChange}
      />
      <div className="form-buttons">
        <button className="form-button" type="submit">Save</button>
        <button className="form-button" type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UserForm;
