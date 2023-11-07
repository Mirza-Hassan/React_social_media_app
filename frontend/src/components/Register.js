import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import '../styles/Register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser();

  // Handle the registration process
  const handleRegister = () => {
    setError('');

    // Check if username and password are provided
    if (!username.trim() || !password.trim()) {
      setError('Username and password are required.');
      return;
    }

    // Send a POST request to register the user
    axios.post('http://localhost:5000/register', {
      username,
      password
    }).then(response => {
      if (response.data.success) {
        // Set user data and token upon successful registration
        setUser({ username: username });
        localStorage.setItem('token', response.data.token);
        navigate('/profile');
      } else {
        setError('User already exists');
      }
    }).catch(error => {
      setError('An error occurred while registering. Please try again.');
    });
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <input
        className="register-input"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="register-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="error-message">{error}</p>}
      <button className="register-button" onClick={handleRegister} data-testid="register-button">
        Register
      </button>
      <p className="register-text" data-testid="login-link">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
};

export default Register;
