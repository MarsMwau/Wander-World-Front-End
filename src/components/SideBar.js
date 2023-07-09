import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaThList
}from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import './SideBar.css'

const SideBar = ({children}) => {
    const [selected, setSelected] = useState(false); 
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
      {
        path:"/feed",
        name:"Feed",
        icon:<FaTh/>
    },
    {
        path:"/new",
        name:"Create",
        icon:<FaUserAlt/>
    },
    {
      path:"/search",
      name:"Search",
      icon:<FaThList/>
  },
    {
        path:"/my-profile",
        name:"My Profile",
        icon:<FaUserAlt/>
    }
    ]
    return (
        <div className="container">
           <div style={{width: isOpen ? "230px" : "80px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Logo</h1>
                   <div style={{marginLeft: isOpen ? "90px" : "2px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               <div className="menu">
               {
                   menuItem.map((item, index)=>(
                       <NavLink
                       to={item.path}
                       key={index}
                       className={selected === index ? "menuItem active" : "menuItem"}
                       onClick={() => setSelected(index)}
                       >
                        <div className="icon">
                        {item.icon}
                            </div>
                            <div style=
                            {{display: isOpen ? "block" : "none"}}
                            className="link_text"
                            >
                                {item.name}
                            </div>
                       </NavLink>
                   ))
               }
               </div>
           </div>
           <main>{children}</main>
        </div>
    );
};

export default SideBar;