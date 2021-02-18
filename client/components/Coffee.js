
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {addNewCoffee, updatedStock} from '../store'


class Coffee extends Component{
    constructor(props){
      super(props)
      this.state = {
        quantity: 1
      };
    
      this.putInCart = this.putInCart.bind(this);
      this.onChange = this.onChange.bind(this);
    }
    
    onChange(ev){
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
      }

      let stock = coffeeStock - quantity;
        
      this.props.updateStock(stock, coffeeId)
      // we are out of stock can't put it in the cart
      if (coffeeStock > 0 && this.props.auth.id)  {      
        this.props.addNewCoffee(quantity, this.props.auth.id, coffeeId);
      } else if ( coffeeStock > 0 ) {      
        console.log('you are trying to add coffee to the guest cart')
        // so this will put an item into local storage
        localStorage.setItem( coffeeId, quantity);
        // this.props.addNewCoffee(1, this.props.auth.id, coffeeId);
        //ideally a function for a pop up window would be called to tell user they added to cart  
      }
    }

    render(){
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
                { coffee.stock > 0 ? (
                <div>
                  {coffee.stock && `stock: ${coffee.stock}`}
                  <br />
                  <input name='quantity' value={ quantity } onChange = { onChange }/>
                  <button onClick = {()=> this.putInCart(`${coffee.id}`, `${coffee.stock}`)}>add to cart</button>
                </div>
                ) : (
                  <p>out of stock</p>
                )}
              </main>
              <a href = '/'>back to main page</a>
            </div>
          </body>
        );
      };  
    }
  
  
export default connect(
    ( {auth, cartList, product}, otherProps)=> {
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
    
