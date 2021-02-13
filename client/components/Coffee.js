import React, { Component } from 'react';
import { connect } from 'react-redux';
import {cart, addNewCoffee} from '../store'

//this will now need to be a component so I can have a function :) probably 
//need to make refresh better

class Coffee extends Component{
    constructor(props){
      super(props)
      this.state = {};
    
        //not enitrely sure if this is needed 
      this.putInCart = this.putInCart.bind(this);
    }
    
    componentDidMount(){
        // console.log("---------------in COFFEE---------------");
        // MIGHT NOT NEED
    }

    putInCart(coffeeId){
        
        //need cartId, coffeId, and quantity
        // console.log('--------------PutInCart------------------'); 
        this.props.addNewCoffee(1, this.props.auth.id, coffeeId);
        // console.log(this.props)
    }

    render(){
    // console.log('in render in coffee');
    // console.log(this.props);
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
                <a href = '/'>back to main page</a>
            </div>

            )
    }
}

export default connect(
    ( {auth, cartList, product}, otherProps)=> {
        // console.log('IN COFFEE COMPONENT')
        // console.log(otherProps)
        const coffee = product.find(coffee => coffee.id === otherProps.match.params.id * 1) || {};
        return {
            coffee,
            auth,
            cartList,
            product
            };
        },(dispatch) => {  
            return {
            setCart(id) {
              dispatch(cart(id))
            },
            addNewCoffee(quantity, userId, coffeeId){
                dispatch(addNewCoffee(quantity, userId, coffeeId))
            }    

          }
        }
        
    )(Coffee);
    