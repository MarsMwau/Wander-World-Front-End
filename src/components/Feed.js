import React, { useEffect, useState } from "react";
import FeedPost from "./FeedPost";
import "./Feed.css";

function Feed() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3000/users", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
      });

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  return (
    <div className="feed">
      <h1>This is the feed</h1>
      <div className="feedWrapper">
        {users.map((user) => (
          <div key={user.id}>
            <h2>Username: {user.username}</h2>
            {user.posts.map((post) => (
              <FeedPost key={post.id} post={post} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Feed;
