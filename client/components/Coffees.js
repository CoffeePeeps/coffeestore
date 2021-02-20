import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loadProducts } from "../store/product";
import { Button, Card, Container, Row, Col, Image } from "react-bootstrap";
import { addNewCoffee, updatedStock } from "../store";

class Coffees extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.bootstrap();
  }

  putInCart(coffeeId, coffeeStock) {
    let stock = coffeeStock - 1;
    // should update the stock of coffee we have in the store
    if (stock >= 0) {
      this.props.updateStock(stock, coffeeId);
    }
    // we are out of stock can't put it in the cart
    if (coffeeStock > 0) {
      this.props.addNewCoffee(1, this.props.auth.id, coffeeId);
      //ideally a function for a pop up window would be called to tell user they added to cart
    }
  }

  render() {
    const coffees = this.props.product;
    return (
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
                        {coffee.stock > 0 ? (
                          <button
                            variant="primary"
                            // className="Add-To-Cart-Button"
                            onClick={() =>
                              this.putInCart(`${coffee.id}`, `${coffee.stock}`)
                            }
                          >
                            Add to Cart
                          </button>
                        ) : (
                          <p>Out of Stock</p>
                        )}
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

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    bootstrap: () => {
      dispatch(loadProducts());
    },
    addNewCoffee(quantity, userId, coffeeId) {
      dispatch(addNewCoffee(quantity, userId, coffeeId));
    },
    updateStock(stock, coffeeId) {
      dispatch(updatedStock(stock, coffeeId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Coffees);
