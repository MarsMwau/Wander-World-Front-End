import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Feed from './components/Feed';
import NewPost from './components/NewPost';
import SearchPost from './components/SearchPost';
import UserProfile from './components/UserProfile';
import SideBar from './components/SideBar';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="AppGlass">
          <SideBar />
          <div className="content">
            <Routes>
              <Route path="/" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/new" element={<NewPost />} />
              <Route path="/search" element={<SearchPost />} />
              <Route path="/my-profile" element={<UserProfile />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
