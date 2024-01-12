import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Login() {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  const handleLogin = () => {
    console.log(emailOrUsername,password)
    axios.post('http://localhost:4000/api/auth/Login', { emailOrUsername, password })
      .then((response) => {
        console.log(response)
        setMessage(response.data.msg);
        navigate('/dashboard');
      })
      .catch((error) => {
        console.error('Error logging in:', error.response.data);
        setMessage(error.response);
      });
  };

  return (
    <div className="App">
      <h1>Login</h1>
      <label>
        Email Or Username:
        <input type="text" value={emailOrUsername} onChange={(e) => setEmailOrUsername(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button onClick={handleLogin}>Submit</button>
      <p>{message}</p>
    </div>
  );
}

export default Login;
