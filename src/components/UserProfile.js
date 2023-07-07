import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FeedPost from "./FeedPost";

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
        // <div key={post.id}>
        //   <h4>{post.title}</h4>
        //   <p>{post.content}</p>
        //   {post.image && <img src={post.image.url} alt="Post" />}
        //   <p>Comments: {post.comments.length}</p>
        //   <p>Likes: {post.likes.length}</p>
        // </div>

        <FeedPost key={post.id} post={post} />
      ))}




{/* <div className="row">
            {products.map((product) => (
              <div className="col-md-3 mb-4" key={product.id}>
                <div className="card h-100 text-center p-4">
                  <img
                    className="card-img-top"
                    src={product.image}
                    alt={product.title}
                    height="250px"
                  />
                  <div className="card-body">
                    <h5 className="card-title mb-0">
                      {product.title.substring(0, 12)}
                    </h5>
                    <p className="card-text">${product.price}</p>
                    <div className="btn-group">
                      <button
                        type="button"
                        className="btn btn-outline-dark"
                        onClick={() => handleClick(product)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div> */}





    </div>
  );
};

export default UserProfile;
