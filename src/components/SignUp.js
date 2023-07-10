// SignUp.js
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
    <div className="Signup">
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <label>
        Confirm Password:
        <input type="password" value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} />
      </label>
      <input type="submit" value="Sign Up" />
      <p>
        <Link to="/login">Already have an account?</Link>
      </p>
    </form>
    </div>
  );
}

export default SignUp;
