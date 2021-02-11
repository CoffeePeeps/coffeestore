import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {cart, loadOpenCart} from '../store'

// so I can't figure out how to use the hashchange 
//this will now need to be a component so I can have a function :) probably 
//need to make refresh better

class Coffee extends Component{
    constructor(props){
      super(props)
      this.state = {}
    
    
    }

// const Coffee = ({ coffee, state }) =>{
//     console.log("in COFFEE")
//     //so from state i can get auth which give me user id so then I need to check for an
//     // open cart 
//     console.log(state);
// should I just load coffee??
    
componentDidMount(){
    //this.props.bootstrap()
    console.log("---------------in COFFEE---------------");
    console.log(this.props.state);
    // const coffee = this.props.coffee;
    // if users has carts this get it
    //this is am api call to see if the user has an open cart 
    this.props.setCart(this.props.state.auth.id)
    this.putInCart = this.putInCart.bind(this);
  }

  //need a function to find open cart or should I just try and assume we have an open cart
  //and woukld this be better done in the server 

  putInCart(coffeeId){
      
    //need cartId, coffeId, and quantity
    //have coffeId and Quantity van get cartId from userId   
    //if there is an open cart
        console.log(this.props.checkForCart(this.props.state.auth.id)); 
        //check to see if product is in it 
            //if it is add to quantity
            //else make a post request to cart_products with cartId and productId
    //else create a cart and make a post request to cart_products with cartId and productId 

}

  render(){
          console.log('in render in coffee');
          console.log(this.props.state.cartList);
          const coffee = this.props.coffee;

    if(!coffee.id){
        return '...loading coffee';
    }
    return(
        <div>
            <header>
                <h1> COFFEE </h1>
                <h2>{ coffee.name } </h2>
                <hr />
            </header>
            <main>
                <h4>Details</h4>
                {coffee.description && `description: ${coffee.description}` }
                <br />
                {coffee.price && `price: ${coffee.price}` }
                <button onClick = {()=> this.putInCart(`${coffee.id}`)}>add to cart</button>
            </main>
        </div>

        )
}
}
export default connect(
    (state, otherProps)=> {
        console.log('IN COFFEE COMPONENT')
        console.log(otherProps)
        const coffee = state.product.find(coffee => coffee.id === otherProps.match.params.id * 1) || {};
        // const coffee = state.product.find(coffee => coffee.id === 1) || {};
        return {
            coffee,
            // so I could get the auth, probably a better way to do it 
            state
            };
        },(dispatch) => {  
            return {
            //this is what will be used to update the cart
            setCart(id) {
              dispatch(cart(id))
            },
            checkForCart(userId){
                dispatch(loadOpenCart(userId))
            }
          }
        }
        
    )(Coffee);
    