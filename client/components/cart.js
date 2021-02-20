import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import StripeCheckout from "react-stripe-checkout"
import {cart, delItem, checkoutCart, addNewCoffee} from '../store'

// React Notification
import { NotificationManager } from 'react-notifications';


const Cart = ({auth, cart, setCart, handleDelete, checkout, updateCoffee}) => {
  useEffect(() => {
    setCart(auth.id)
  }, [])

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
          {cart.items.map(item => (
            <tr key={item.coffee.id}>
              <td>
                <button onClick={() => handleDelete(item.coffee, auth.id)}>
                X
                </button>
              </td>
              <td>{item.coffee.name}</td>
              <td>
                {item.quantity}
                <button onClick={() => updateCoffee(1, auth.id, item.coffeeId)}>+</button>
                <button disabled={item.quantity === 1 && true} onClick={() => updateCoffee(-1, auth.id, item.coffeeId)}>-</button>
              </td>
              <td>{(item.coffee.price * item.quantity)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <h1>Total</h1>
        <div>
          <p>Subtotal: ${cart.total}</p>
          <p>Shipping: FREE</p>
          <p>Tax: $0.00</p>
          <p>Total: ${cart.total}</p>
        </div>

        {/* <button onClick={
          () => checkout(cart.items, auth.id)
        }>Checkout</button> */}
        <StripeCheckout
          token={(token, addresses) => checkout(cart.items, auth.id, token, addresses)}
          stripeKey={process.env.STRIPE_TEST_API_KEY}
          amount={cart.total*100}
          billingAddress
          shippingAddress
        />
      </div>

    </div>
  )
}



const mapState = ({auth, cart}) => {
  return {
    auth,
    cart
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
    checkout(items, uid, token, addresses){
      const stripeInfo = {token, addresses}
      NotificationManager.success('Checkout Successful', 'Success!', 2000);
      dispatch(checkoutCart(items[0].cartId, uid, stripeInfo, items))
    },
    updateCoffee(qty, uid, coffeeId){
      dispatch(addNewCoffee(qty, uid, coffeeId))
    }
  }
}

export default connect(mapState, mapDispatch)(Cart)
