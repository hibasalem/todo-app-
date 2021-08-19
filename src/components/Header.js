import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className="hedear">
      <Navbar>
        <Navbar.Brand className="name">To Do List</Navbar.Brand>
        <Nav className="names" className="nav">
          <Link to="/" className="names">
            Home
          </Link>
          {/* <Link to="/settings" className="names">
            settings
          </Link> */}
        </Nav>
      </Navbar>
    </div>
  );
}
