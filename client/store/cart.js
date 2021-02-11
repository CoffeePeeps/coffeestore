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
    cartItems.total = 0
    for(let i = 0; i < cartItems.length; i++){
      cartItems.total += cartItems[i].coffee.price
    }
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
      return state.filter((cart) => cart.coffee.id !== action.item.id)
    case CHECKOUT_CART:
      return action.cart
    default:
      return state
  }
}
