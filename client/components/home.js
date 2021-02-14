import React from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import Coffees from "./Coffees";
import Coffee from "./Coffee";
import { Button, Card } from "react-bootstrap";

/**
 * COMPONENT
 */
export const Home = (props) => {
  console.log("in home");
  console.log(props);
  const { email } = props;

  return (
    <div>
      <div>
        <h3 id="welcome">Welcome, {email}</h3>
      </div>
      <div>
        {/* Putting Coffees in home */}
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
