import React, { Component } from 'react';
import { connect } from 'react-redux';
import {cart, loadOpenCart, createCart, addNewCoffee} from '../store'

//this will now need to be a component so I can have a function :) probably 
//need to make refresh better

class Coffee extends Component{
    constructor(props){
      super(props)
      this.state = {};
    
        //not enitrely sure if this is needed 
      this.putInCart = this.putInCart.bind(this);
      this.doesUserhaveCart = this.doesUserhaveCart.bind(this);
    }
    
componentDidMount(){
    // console.log("---------------in COFFEE---------------");
    // console.log(this.props.state);

    //will get a cart with things in it, saved as cartList in store 
    this.props.setCart(this.props.auth.id)
    // will check for open cart saved as newCart in store, needed in case cart is empty 
    this.props.checkForCart(this.props.auth.id);
    console.log(this.props);
  }

  doesUserhaveCart(){
      
        // just check to see if there is a cart 
        let cart = this.props.newCart;
        if (!cart){
            // create new cart
             this.props.createNewCart(this.props.auth.id);
             //is this like a refresh??
            // this.props.checkForCart(this.props.auth.id);
        }
      
        
    }

  putInCart(coffeeId){
    
    //need cartId, coffeId, and quantity
        console.log('--------------PutInCart------------------'); 

        //will move this logic into think 
        this.doesUserhaveCart();

        this.props.checkForCart(this.props.auth.id);

        console.log(this.props)
        const cartList = this.props.cartList;
        //assume it's not in cart
        let newCoffee = true;
        // check to see if it is in the cart
        for (let i=0; i<cartList.length; i++){
            console.log(cartList[i].coffeeId);
            if(cartList[i].coffeeId * 1 === coffeeId * 1){
                // console.log('you already have it')
                newCoffee = false;
            }
        }

        // the user does not have the coffee so add it, quantity is hard coded for now
        if (newCoffee){
            this.props.addNewCoffee(1, this.props.newCart.id, coffeeId);
            // is this needed??
            this.props.setCart(this.props.auth.id)
        }
        
        //TO-DO add to an already existing quantity

         
        console.log(this.props)
}

  render(){
        console.log('in render in coffee');
    
        console.log(this.props);
        const coffee = this.props.coffee;
 

        // //if the length is still zero they do not have a cart
        // if (cart.length === 0){
        //     //see if the users just has an empty cart 
        //     console.log('User has no cart');
        // }

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
            <a href = '/'>back to main page</a>
        </div>

        )
}
}
export default connect(
    ( {auth, newCart, cartList, product}, otherProps)=> {
        // console.log('IN COFFEE COMPONENT')
        // console.log(otherProps)
        const coffee = product.find(coffee => coffee.id === otherProps.match.params.id * 1) || {};
        // const coffee = state.product.find(coffee => coffee.id === 1) || {};
        return {
            coffee,
            // so I could get the auth, probably a better way to do it 
            // state,
            auth,
            newCart,
            cartList,
            product
            };
        },(dispatch) => {  
            return {
            //this is what will be used to update the cart
            setCart(id) {
              dispatch(cart(id))
            },
            checkForCart(userId){
                dispatch(loadOpenCart(userId))
            },
            createNewCart(userId){
                dispatch(createCart(userId))
            },
            addNewCoffee(quantity, cartId, coffeeId){
                dispatch(addNewCoffee(quantity, cartId, coffeeId))
            }

          }
        }
        
    )(Coffee);
    