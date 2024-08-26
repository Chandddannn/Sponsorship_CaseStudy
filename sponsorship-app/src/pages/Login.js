import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/user.json');
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const contentType = response.headers.get('Content-Type');
      
      if (!contentType || !contentType.includes('application/json')) {
       const text = await response.text();
        throw new Error('Expected JSON but received ' + contentType + ": " + text);
      }
      
      const data = await response.json();
      
      const user = data.find(user => user.username === username && user.password === password);
      
      if (user) {
        localStorage.setItem('auth', JSON.stringify(user));
        navigate('/');
      } else {
        setError('Invalid username or password');
      }
      
    } catch (err) {
      console.error(err);
      setError('Failed to authenticate');
    }
  };
  

  return (
    <div className="login-page">
      <h1>Login</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
