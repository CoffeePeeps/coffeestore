import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import StripeCheckout from "react-stripe-checkout"
import {cart, delItem, checkoutCart, addNewCoffee, updatedStock} from '../store'

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
                <button onClick={() => {
                  updatedStock(item.coffee.stock + 1 ,item.coffeeId)
                  updateCoffee(1, auth.id, item.coffeeId)
                }}>+</button>
                <button disabled={item.quantity === 1 && true} onClick={() => {
                  updatedStock(item.coffee.stock - 1 ,item.coffeeId)
                  updateCoffee(-1, auth.id, item.coffeeId)
                  }}>-</button>
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

        <StripeCheckout
          token={(token, addresses) => checkout(cart.items, auth.id, token, addresses)}
          stripeKey="pk_test_51ILK1lLfvWrZDmuZMXaRPM2DZJTsiWZCLF0kN6XuqF9jMLq5eYjh59Vaqvr1XshlKGPRbF2Q1PRxFv1G72IZBCpf000VL6GWuC"
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
