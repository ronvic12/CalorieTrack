import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
function Login() {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    console.log(emailOrUsername,password)
    axios.post('http://localhost:4000/api/auth/Login', { emailOrUsername, password })
      .then((response) => {
        console.log(response)
        setMessage(response.data.msg);
        navigate('/dashboard');
      })
      .catch((error) => {
        console.error('Error logging in:', error.response.data.message);
        setMessage(error.response.data.message);
      });
  };

  return (
<Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h1>Login</h1>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="email">
              <Form.Label>Email/Username</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter email or username" 
                value={emailOrUsername} 
                onChange={(e) => setEmailOrUsername(e.target.value)} 
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
      <p>{message}</p>
    </Container>




    // <div className="App">
    //   <h1>Login</h1>
    //   <label>
    //     Email Or Username:
    //     <input type="text" value={emailOrUsername} onChange={(e) => setEmailOrUsername(e.target.value)} />
    //   </label>
    //   <br />
    //   <label>
    //     Password:
    //     <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
    //   </label>
    //   <br />
    //   <button onClick={handleLogin}>Submit</button>
    //  
    // </div>
  );
}

export default Login;
