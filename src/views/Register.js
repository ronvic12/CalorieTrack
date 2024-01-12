import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  const handleRegistration = () => {
    axios.post('http://localhost:4000/api/auth/Register', { email,FirstName,LastName,username, password, confirmpassword })
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
      <label>
        Confirm Password:
        <input type="password" value={confirmpassword} onChange={(e) => setconfirmpassword(e.target.value)} />
      </label>
      <br />
      <button onClick={handleRegistration}>Submit</button>
      <p>{message}</p>
    </div>
  );
}

export default  Register;
