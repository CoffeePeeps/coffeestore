import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {cart, delItem, checkoutItem} from '../store'

const Cart = ({auth, cartList, setCart, handleDelete, checkout}) => {

  // basically componentDidMount but for functional components
  useEffect(() => {
    setCart(auth.id)
  }, [setCart])

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
          {cartList.map(item => (
            <tr key={item.coffee.id}>
              <td>
                <button onClick={() => handleDelete(item.coffee, auth.id)}>
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

      <div>
        <h1>Total</h1>
        <div>
          <p>Subtotal: ${cartList.total}</p>
          <p>Shipping: FREE</p>
          <p>Tax: $0.00</p>
          <p>Total: ${cartList.total}</p>
        </div>

        <button onClick={
          () => checkout(cartList, auth.id)
        }>Checkout</button>
      </div>
    </div>
  )
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
    },
    checkout(cart, uid){
      // handle payment processing here
      const body = {
        payment: "success"
      }

      dispatch(checkoutItem(cart[0].cartId, uid, body))
    }
  }
}

export default connect(mapState, mapDispatch)(Cart)
