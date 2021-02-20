import React from "react";
import { connect } from "react-redux";
import Coffees from "./Coffees";
import { Button, Card } from "react-bootstrap";

/**
 * COMPONENT
 */

export const Home = props => {
  // so we have logged in 
  const {email} = props

 


  return (
    <div>
      <div>
        <h3 id="welcome">Welcome, {email}</h3>
      </div>
      <div>
        <Coffees />
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.auth.email,
  };
};

export default connect(mapState)(Home);
