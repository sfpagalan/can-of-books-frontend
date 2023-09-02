import React from 'react';
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";
import AuthButtons from './components/auth/AuthButtons';

function Header() {

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand>My Can Of Books</Navbar.Brand>
      <Nav className="mr-auto">
        <NavItem><Link to="/" className="nav-link">Home</Link></NavItem>
        <NavItem><Link to="/about" className="nav-link">About</Link></NavItem>
        <NavItem><Link to="/profile" className="nav-link">Profile</Link></NavItem>
      </Nav>
      <Nav>
      <AuthButtons />
      </Nav>
    </Navbar>
  );
}

export default Header;
