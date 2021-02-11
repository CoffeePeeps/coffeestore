import React, {Component} from 'react'
import {connect} from 'react-redux'
import {cart} from '../store'

class Cart extends Component{
  constructor(props){
    super(props)
    this.state = {}
  }

  componentDidMount(){
    console.log('-----------CART---------------')
    this.props.setCart(this.props.auth.id)
  }

  render(){
    console.log('-----------CART---------------')
    return(
      <div>
        <h1>Cart</h1>

        <table>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>QTY</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {this.props.cartList.map(item => (
              <tr key={item.coffee.id}>
                <td><button>X</button></td>
                <td>{item.coffee.name}</td>
                <td>{item.quantity}</td>
                <td>{item.coffee.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapState = ({auth, cartList}) => {
  return {
    auth,
    cartList
  }
}

const mapDispatch = dispatch => {
  return {
    setCart(id) {
      dispatch(cart(id))
    }
  }
}

export default connect(mapState, mapDispatch)(Cart)
