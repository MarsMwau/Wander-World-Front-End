import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/Login';
import SignUpPage from './components/SignUp';
import Feed from './components/Feed';
// import { Navigate } from 'react-router-dom';
import './App.css';
import NewPost from './components/NewPost';
import Searchbar from './components/Searchbar';
import UserProfile from './components/UserProfile';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/new" element={<NewPost />} />
          <Route path="/search" element={<Searchbar />} />
          <Route path="/my-profile" element={<UserProfile />} />
        </Routes>
        {/* <Navigate to="/my-profile" /> */}
      </div>
    </Router>
  );
}
export default App;