import axios from 'axios'
import history from '../history'

const storage = () => window.localStorage
const TOKEN = 'token'

/**
 * ACTION TYPES
 */
const SET_CART = 'SET_CART'
const DELETE_ITEM = 'DELETE_ITEM'
const CHECKOUT_CART = "CHECKOUT_CART"

/**
 * ACTION CREATORS
 */
const setCart = cartList => ({type: SET_CART, cartList})
const deleteCart = item => ({type: DELETE_ITEM, item})
const checkoutCart = cart => ({type: CHECKOUT_CART, cart})

/**
 * THUNK CREATORS
 */
export const cart = (userId) => async dispatch => {
  const token = storage().getItem(TOKEN)
  if (token) {
    const res = await axios.get(`/api/cart/${userId}`)
    const cartItems = res.data
    cartItems.total = subtotal(cartItems)
    return dispatch(setCart(cartItems))
  }
}

export const delItem = (item, userId) => async dispatch => {
  const token = storage().getItem(TOKEN)
  if(token){
    await axios.delete(`/api/cart/${userId}/${item.id}`)
    return dispatch(deleteCart(item))
  }
}

export const checkoutItem = (cartId, userId , body) => async dispatch => {
  const token = storage().getItem(TOKEN)
  if(token){
    await axios.put(`/api/checkout/${userId}/${cartId}`, body)
    return dispatch(checkoutCart([]))
  }
}

/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case SET_CART:
      return action.cartList
    case DELETE_ITEM:
      const items = state.filter((cart) => cart.coffee.id !== action.item.id)
      items.total = subtotal(items)
      return items
    case CHECKOUT_CART:
      action.cart.total = 0.00
      return action.cart
    default:
      return state
  }
}

const subtotal = arr => {
  let total = 0
  for(let i = 0; i < arr.length; i++){
    total += (arr[i].coffee.price * arr[i].quantity)
  }
  console.log(arr)
  return Math.round(total*100)/100
}
