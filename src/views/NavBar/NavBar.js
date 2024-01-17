import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavBar = () => (

    <Navbar bg="dark" variant="dark">
      <Nav className="mr-auto" style={{ color: '#FFFFFF' }}>
        <Nav.Link href="/register">Register</Nav.Link>
        <Nav.Link href="/login">Login</Nav.Link>
        <Nav.Link href="/profile">Profile</Nav.Link>
      </Nav>
    </Navbar>
)

export default NavBar;