
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {addNewCoffee} from '../store'
import {updatedStock} from '../store'

//this will now need to be a component so I can have a function :) probably 
//need to make refresh better

class Coffee extends Component{
    constructor(props){
      super(props)
      this.state = {
        quantity: 1
      };
    
        //not enitrely sure if this is needed 
      this.putInCart = this.putInCart.bind(this);
      this.onChange = this.onChange.bind(this);
    }
    
    componentDidMount(){
        // console.log("---------------in COFFEE---------------");
        // MIGHT NOT NEED
    }

    onChange(ev){
      const change = {};
      change[ev.target.name] = ev.target.value;
      this.setState(change);
      // console.log(this.state)
    }

    putInCart(coffeeId, coffeeStock){
        
      // console.log(coffeeStock);
      //quantity should only be a positive
      let quantity = Math.ceil(this.state.quantity * 1)
      
      // if it's not a positive integer just make it 1
      // should show a message 
      if (isNaN(quantity) || quantity < 1 ){
          // console.log(quantity);
          quantity = 1;
      } 
      
      //can't sell more than we have 
      if (quantity > coffeeStock){
        quantity = coffeeStock * 1;
      }

        let stock = coffeeStock - quantity;
        // console.log(quantity);
        this.props.updateStock(stock, coffeeId)
        // we are out of stock can't put it in the cart
        if (quantity > 0) {      
          this.props.addNewCoffee(quantity, this.props.auth.id, coffeeId);
        } 
    }

    render(){
    // console.log('in render in coffee');
    // console.log(this.props);
        const coffee = this.props.coffee;
        const { quantity } = this.state;
        const { onChange } = this;

        if(!coffee.id){
            return '...loading coffee';
        }
  
        return (
          <body>
            <div>
              <header>
                <h1 id="prodDescription"> Product Description ☕ </h1>
                <h2>{coffee.name} </h2>
      
                <hr />
              </header>
              <main>
                <h4>Details</h4>
                {coffee.description && `description: ${coffee.description}`}
                <br />
                {coffee.price && `price: ${coffee.price}`}
                <br />
                {coffee.stock && `stock: ${coffee.stock}`}
                <br />
                <input name='quantity' value={ quantity } onChange = { onChange }/>
                <button onClick = {()=> this.putInCart(`${coffee.id}`, `${coffee.stock}`)}>add to cart</button>
                </main>
                <a href = '/'>back to main page</a>
            </div>
          </body>
        );
      };  
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
            addNewCoffee(quantity, userId, coffeeId){
                dispatch(addNewCoffee(quantity, userId, coffeeId))
            },    
            updateStock(stock, coffeeId){
              dispatch(updatedStock(stock, coffeeId))
          },

            
          }
        }
        
    )(Coffee);
    
