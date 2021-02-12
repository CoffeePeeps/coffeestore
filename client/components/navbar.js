import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import {
  Button,
  Nav,
  Navbar,
  NavDropdown,
  Form,
  FormControl,
} from "react-bootstrap";

const Header = ({ handleClick, isLoggedIn }) => (
  <Navbar bg="dark" variant="dark" expand="lg">
    <Navbar.Brand href="/home">COFFEE COFFEE COFFEE</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      {isLoggedIn ? (
        <Nav className="mr-auto">
          <Nav.Link><Link to="/home">Home</Link></Nav.Link>
          <Nav.Link href="#" onClick={handleClick}> Logout </Nav.Link>
          <Nav.Link><Link to="/cart">Cart</Link></Nav.Link>
        </Nav>
      ) : (
        <Nav className="mr-auto">
          <Nav.Link><Link to="/home">Home</Link></Nav.Link>

          <NavDropdown title="Login / Sign Up" id="basic-nav-dropdown">
            <NavDropdown.Item><Link to="/login">Login</Link></NavDropdown.Item>
            <NavDropdown.Item ><Link to="/signup">Signup</Link></NavDropdown.Item>
          </NavDropdown>
        </Nav>
      )}
      <Form inline></Form>
    </Navbar.Collapse>
  </Navbar>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Header);
