import React, { Component } from "react";
import { connect } from "react-redux";
import { addNewCoffee, updatedStock } from "../store";
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Image,
  Form,
} from "react-bootstrap";
import * as mdb from "mdb-ui-kit"; // lib

import { NotificationManager } from 'react-notifications';
// import "~react-notifications/lib/notifications.css";

class Coffee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
    };

    this.putInCart = this.putInCart.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

    putInCart(coffeeId, coffeeStock){
        
      //make sure it is type number and a whole number
      let quantity = Math.ceil(this.state.quantity * 1)
      
      // if it's not a positive integer just make it 1
      // should show a message 
      if (isNaN(quantity) || quantity < 1 ){
          quantity = 1;
      } 
      
      //can't sell more than we have 
      if (quantity > coffeeStock){
        quantity = coffeeStock * 1;
        NotificationManager.error('We do not have that much coffee!', 'Oops!', 1000)
      }

      let stock = coffeeStock - quantity;
        
      this.props.updateStock(stock, coffeeId)
      // we are out of stock can't put it in the cart
      if (coffeeStock > 0 && this.props.auth.id)  {      
        this.props.addNewCoffee(quantity, this.props.auth.id, coffeeId);
        NotificationManager.success('You have added a delicious coffee!', 'Success!', 1000)
      } else if ( coffeeStock > 0 ) {      
        console.log('you are trying to add coffee to the guest cart')
        // so this will put an item into local storage
        localStorage.setItem( coffeeId, quantity);
        // this.props.addNewCoffee(1, this.props.auth.id, coffeeId);
        //ideally a function for a pop up window would be called to tell user they added to cart  
      }
    }

  render() {
    const coffee = this.props.coffee;
    const { quantity } = this.state;
    const { onChange } = this;

    if (!coffee.id) {
      return "...loading coffee";
    }
    return (
      <main className="mt-5 pt-4">
        <div className="container dark-grey-text mt-5">
          <div className="row wow fadeIn">
            <div className="col-md-6 mb-4">
              <img
                src={window.location.origin + "/assets/delicious-coffee.jpg"}
                className="img-fluid"
                alt=""
              />
            </div>

            <div className="col-md-6 mb-4">
              <div className="p-4">
                <p className="lead">
                  <span className="mr-1"></span>
                  <span>${coffee.price}</span>
                </p>

                <p className="lead font-weight-bold">{coffee.description}</p>
                <h2></h2>

                <p>
                  This is the description of the product: {coffee.description}
                </p>
                <br />
                {coffee.stock > 0 ? (
                  <div>
                    {coffee.stock && `stock: ${coffee.stock}`}
                    <br />
                    <Form>
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Select Quanity</Form.Label>
                        <Form.Control as="select">
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                          <option>6</option>
                          <option>7</option>
                          <option>8</option>
                          <option>9</option>
                          <option>10</option>
                        </Form.Control>
                      </Form.Group>
                      <input
                        name="quantity"
                        value={quantity}
                        onChange={onChange}
                      />

                      <button
                        onClick={() => this.putInCart(`${coffee.id}`, `${coffee.stock}`)
                        }
                      >
                        Add to Cart
                      </button>
                    </Form>
                  </div>
                ) : (
                  <p>
                    Sorry, this product is out of stock. Please check back
                    later.
                  </p>
                )}
                {/* <form className="d-flex justify-content-left">

              <input type="number" value="1" aria-label="Search" className="form-control" style="width: 100px">
              <button className="btn btn-primary btn-md my-0 p" type="submit">Add to cart
                <i className="fas fa-shopping-cart ml-1"></i>
              </button>

            </form> */}
              </div>
            </div>
          </div>

          <hr />
        </div>
      </main>
    );
  }
}

export default connect(
  ({ auth, cartList, product }, otherProps) => {
    const coffee =
      product.find((coffee) => coffee.id === otherProps.match.params.id * 1) ||
      {};
    return {
      coffee,
      auth,
      cartList,
      product,
    };
  },
  (dispatch) => {
    return {
      addNewCoffee(quantity, userId, coffeeId) {
        dispatch(addNewCoffee(quantity, userId, coffeeId));
      },
      updateStock(stock, coffeeId) {
        dispatch(updatedStock(stock, coffeeId));
      },
    };
  }
)(Coffee);
