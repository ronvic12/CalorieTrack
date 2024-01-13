import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from "./NavBar/NavBar"
import { Form, Button, Col, Row } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';

function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  const handleRegistration = (e) => {
    e.preventDefault(); // this prevents default page when submitting
    axios.post('http://localhost:4000/api/auth/Register', { FirstName,LastName,email,username, password, confirmpassword })
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
       <div>
         <NavBar></NavBar>
      <h2 className="mb-4">Registration Form</h2>
      <Form onSubmit={handleRegistration}>
        <Form.Group as={Row} controlId="formHorizontalFirstName">
          <Form.Label column sm={2}>
            First Name
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="First Name" value = {FirstName} onChange={(e) => setFirstName(e.target.value)} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalLastName">
          <Form.Label column sm={2}>
            Last Name
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Last Name" value = {LastName}  onChange={(e) => setLastName(e.target.value)} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            Email
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="email" placeholder="Email" value = {email} onChange={(e) => setEmail(e.target.value)} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formUsername">
          <Form.Label column sm={2}>
            Username
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Username" value = {username} onChange={(e) => setUsername(e.target.value)} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalPassword">
          <Form.Label column sm={2}>
            Password
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="password" placeholder="Password" value = {password} onChange={(e) => setPassword(e.target.value)} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalConfirmPassword">
          <Form.Label column sm={2}>
            Confirm Password
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="password" placeholder="Confirm Password" value = {confirmpassword} onChange={(e) => setConfirmpassword(e.target.value)} />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
          <br/>
            <Button type="submit">
             
              <FaUser /> Register
            </Button>
          </Col>
        </Form.Group>
      </Form>
      <p>{message}</p>
    </div>
  );
}

export default  Register;
