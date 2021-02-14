import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loadProducts, loadProduct } from "../store/product";
import { Button, Card, Container, Row, Col, Image } from "react-bootstrap";

// this is just stolen from past projects it will probably need to be modified but we are just trting to display all our coffee

class Coffees extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.bootstrap();
  }
  render() {
    // console.log("in render in coffees");
    // console.log(this.props);
    const coffees = this.props.product;
    return (
      //maybe instead of a link it coyuld be a function would I need to send the
      // coffee id to the store so made a function but then moved this to the navbar
      //but still not sure how to make it work so will probably need to remake the function
      <div className={"list"}>
        <Container>
          <Row>
            {coffees.map((coffee) => {
              return (
                <div key={coffee.id}>
                  <Col md={4} sm={6}>
                    {" "}
                    <Card
                      className="bg-dark text-white mt-4"
                      className="body2 mt-4"
                      style={{ width: "18rem" }}
                      key={coffee.id}
                    >
                      <Card.Img
                        variant="top"
                        src={window.location.origin + "/assets/Coffee1.jpg"}
                      />
                      <Card.Body>
                        <Card.Title>
                          <Link to={`/coffee/${coffee.id}`}>{coffee.name}</Link>{" "}
                        </Card.Title>
                        <Card.Text>Place Holder Text</Card.Text>
                        <Button variant="primary">Add to Cart</Button>
                      </Card.Body>
                    </Card>
                  </Col>
                </div>
              );
            })}
          </Row>
        </Container>
      </div>
    );
  }
}
//maybe a detailed view can just go here?? or at the end of the return statement with
//an if statement??

const mapStateToProps = (state) => {
  return state;
};

//call loadStudents here, now need to add a load async
//nick showed me how to simplfy the logic, don't have time to impliment it but hope to go back to it latter
const mapDispatchToProps = (dispatch) => {
  // console.log("in bootstrap");
  return {
    bootstrap: () => {
      //may need to change the name
      dispatch(loadProducts());
    },
    sendCoffeeId: (id) => {
      //may need to change the name
      // console.log(id);
      dispatch(loadProduct(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Coffees);
