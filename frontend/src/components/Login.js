import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import '../styles/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();
  const { setUser } = useUser();

  // Function to handle login
  const handleLogin = () => {
    setErrorMsg(null);

    if (!username.trim() || !password.trim()) {
      setErrorMsg('Username and password are required.');
      return;
    }

    axios.post('http://localhost:5000/login', {
      username,
      password
    }).then(response => {
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        setUser({ username: username });
        navigate('/profile');
      } else {
        setErrorMsg('Invalid credentials');
      }
    }).catch(error => {
      setErrorMsg('An error occurred. Please try again.');
    });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        className="login-input"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="login-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="login-button" onClick={handleLogin}>
        Login
      </button>
      {errorMsg && <p className="error-text">{errorMsg}</p>} 
      <p className="login-text">
        Don't have an account? <Link to="/" data-testid="register-link">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
