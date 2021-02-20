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

const Header = ({ handleClick, isLoggedIn, isAdmin }) => (
  <Navbar bg="dark" variant="dark" expand="lg">
    <Navbar.Brand href="/home">COFFEE PEEPS</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      {isAdmin ? (
        <Nav className="ml-auto">
        <Link to="/home">Home</Link>

        <Link to="/cart">Cart</Link>
        <Link to="/user">Account</Link>
        <NavDropdown title="Admin" id="admin-nav-dropdown">
          <NavDropdown.Item><Link to="/admin/allCoffees">All Coffees (for editing)</Link></NavDropdown.Item>
          <NavDropdown.Item ><Link to="/admin/addNewCoffee">Add New Coffee</Link></NavDropdown.Item>
        </NavDropdown>
        <Link to="/home" onClick={handleClick}> Logout </Link>
      </Nav>
      )
      :
      (isLoggedIn ? (
        <Nav className="ml-auto">
          <Link to="/home">Home</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/user">Account</Link>
          <Link to="/home" onClick={handleClick}> Logout </Link>
        </Nav>
      ) : (
        <Nav className="ml-auto">
          <Link to="/home">Home</Link>
          {/* <Nav.Link><Link to="/home">Guest</Link></Nav.Link> */}
          <NavDropdown title="Login / Sign Up" id="basic-nav-dropdown">
            <NavDropdown.Item><Link to="/login">Login</Link></NavDropdown.Item>
            <NavDropdown.Item ><Link to="/signup">Signup</Link></NavDropdown.Item>
          </NavDropdown>
        </Nav>

      ))}
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
    isAdmin: (state.auth.typeOfUser === 'ADMIN'),
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
