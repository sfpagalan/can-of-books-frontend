import React from 'react';
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function Header() {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand>My Can Of Books</Navbar.Brand>
      <Nav className="mr-auto">
        <NavItem><Link to="/" className="nav-link">Home</Link></NavItem>
        <NavItem><Link to="/about" className="nav-link">About</Link></NavItem>
      </Nav>
      <Nav>
        {isAuthenticated ? (
          <NavItem onClick={() => logout({ returnTo: window.location.origin })}>
            <span className="nav-link">Logout</span>
          </NavItem>
        ) : (
          <NavItem onClick={() => loginWithRedirect()}>
            <span className="nav-link">Login</span>
          </NavItem>
        )}
      </Nav>
    </Navbar>
  );
}

export default Header;
