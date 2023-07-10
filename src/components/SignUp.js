import React, { useState } from "react";
import "./signup.css";
import { Link } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch("http://127.0.0.1:3000/users", { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          user: { email, username, password, password_confirmation: passwordConfirmation }
        }) 
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
  
      // save the token in localStorage
      localStorage.setItem("token", data.token);
    } catch (error) {
      console.error("Sign up failed", error);
    }
  };
  

  return (
    <div className="signup">
      <form onSubmit={handleSubmit}>
        <h1 className="signup__title">Sign Up</h1>
        <div className="signup__input-wrapper">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" className="signup__input" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="signup__input-wrapper">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" className="signup__input" value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div className="signup__input-wrapper">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" className="signup__input" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div className="signup__input-wrapper">
          <label htmlFor="password-confirmation">Confirm Password:</label>
          <input type="password" id="password-confirmation" className="signup__input" value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} />
        </div>
        <button type="submit" className="signup__button">Sign Up</button>
        <p className="signup__login-link">
          Already have an account? <Link to="/login" className="signup__login-link-text">Log in</Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
