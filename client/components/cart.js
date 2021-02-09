import React, {Component} from 'react'
import {connect} from 'react-redux'
import {cart, delItem} from '../store'

class Cart extends Component{
  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.props.setCart(this.props.auth.id)
  }

  render(){
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
                <td>
                  <button onClick={() => this.props.handleDelete(item.coffee, this.props.auth.id)}>
                  X
                  </button>
                </td>
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
    setCart(uid) {
      dispatch(cart(uid))
    },
    handleDelete(item, uid){
      dispatch(delItem(item,uid))
    }
  }
}

export default connect(mapState, mapDispatch)(Cart)
