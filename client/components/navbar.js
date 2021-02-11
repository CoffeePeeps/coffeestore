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
  // <div>
  //   <h1>COFFEE COFFE COFFE</h1>
  //   <nav>
  //     {isLoggedIn ? (
  //       <div>
  //         {/* The navbar will show these links after you log in */}
  //         <Link to="/home">Home</Link>
  //         <a href="#" onClick={handleClick}>
  //           Logout
  //         </a>
  //         <Link to="/cart">My Cart</Link>
  //       </div>
  //     ) : (
  //       <div>
  //         {/* The navbar will show these links before you log in */}
  //         <Link to="/login">Login</Link>
  //         <Link to="/signup">Sign Up</Link>
  //         <Button variant="primary">Primary</Button>
  //       </div>
  //     )}
  //   </nav>
  //   <hr />
  // </div>

  <Navbar bg="dark" variant="dark" expand="lg">
    <Navbar.Brand href="/home">COFFEE COFFEE COFFEE</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="/home">Home</Nav.Link>

        <NavDropdown title="Login / Sign Up" id="basic-nav-dropdown">
          <NavDropdown.Item href="/login">Login</NavDropdown.Item>
          <NavDropdown.Item href="/signup">Sign Up</NavDropdown.Item>
        </NavDropdown>

        <Nav.Link href="#cart">Cart (3)</Nav.Link>
      </Nav>
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
