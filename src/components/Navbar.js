import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <div className="logo">
        <Link to="/">Wander World</Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/Home">Home</Link>
        </li>
        <li>
          <Link to="/User profile">User profile</Link>
        </li>
        <li>
            <Link to="/New post">New post</Link>
         </li> 
         <li>
            <Link to="/Log out">Log out</Link>
         </li> 
      </ul>
    </nav>
  );
};

export default Navbar;
