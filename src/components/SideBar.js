import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMagnifyingGlass, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import { FaTh, FaBars, FaUserAlt, FaThList } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import './SideBar.css';

const SideBar = ({ children }) => {
  const [selected, setSelected] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();
  const [isLoggedIn, setLoggedIn] = useState(true);
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete('/logout', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoggedIn(false);
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  const menuItem = [
    {
      path: '/feed',
      name: 'Feed',
      icon: <FaTh />,
    },
    {
      path: '/new',
      name: 'Create',
      icon: <FontAwesomeIcon icon={faPlus} />,
    },
    {
      path: '/search',
      name: 'Search',
      icon: <FontAwesomeIcon icon={faMagnifyingGlass} />,
    },
    {
      path: '/my-profile',
      name: 'My Profile',
      icon: <FaUserAlt />,
    },
    {
      name: 'Logout',
      icon: <FontAwesomeIcon icon={faRightFromBracket} />,
      onClick: handleLogout,
    },
  ];
  return (
    <div className="container">
      <div style={{ width: isOpen ? '230px' : '80px' }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? 'block' : 'none' }} className="logo">
            WWorld
          </h1>
          <div style={{ marginLeft: isOpen ? '90px' : '2px' }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        <div className="menu">
          {menuItem.map((item, index) =>
            item.path ? (
              <NavLink
                to={item.path}
                key={index}
                className={selected === index ? 'menuItem active' : 'menuItem'}
                onClick={() => setSelected(index)}
              >
                <div className="icon">{item.icon}</div>
                <div style={{ display: isOpen ? 'block' : 'none' }} className="link_text">
                  {item.name}
                </div>
              </NavLink>
            ) : (
              <button key={index} className="menuItem" onClick={item.onClick}>
                <div className="icon">{item.icon}</div>
                <div style={{ display: isOpen ? 'block' : 'none' }} className="link_text">
                  {item.name}
                </div>
              </button>
            )
          )}
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default SideBar;
