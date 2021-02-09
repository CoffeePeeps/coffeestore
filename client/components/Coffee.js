import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {cart} from '../store'

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
    this.props.setCart(this.props.state.auth.id)
  }
  render(){
          console.log('in render in coffee')
          console.log(this.props)
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
                <button onClick = {()=> console.log(`${coffee.id}`)}>add to cart</button>
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
            state
            };
        },(dispatch) => {  
            return {
            setCart(id) {
              dispatch(cart(id))
            }
          }
        }
        
    )(Coffee);
    