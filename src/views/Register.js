import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegistration = () => {
    axios.post('http://localhost:4000/api/auth/RegisterAuth', { email,FirstName,LastName,username, password })
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.error('Error logging in:', error);
      });
  };

  return (
    <div className="App">
      <h1>Register</h1>
      <label>
        Email:
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        First Name:
        <input type="text" value={FirstName} onChange={(e) => setFirstName(e.target.value)} />
      </label>
      <label>
        Last Name:
        <input type="text" value={LastName} onChange={(e) => setLastName(e.target.value)} />
      </label>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button onClick={handleRegistration}>Submit</button>
      <p>{message}</p>
    </div>
  );
}

export default Register;
