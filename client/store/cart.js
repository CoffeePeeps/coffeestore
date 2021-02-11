import axios from 'axios'
import history from '../history'

const storage = () => window.localStorage
const TOKEN = 'token'

/**
 * ACTION TYPES
 */
const SET_CART = 'SET_CART'
const DELETE_CART = 'DELETE_CART'

/**
 * ACTION CREATORS
 */
const setCart = cartList => ({type: SET_CART, cartList})
const deleteCart = item => ({type: DELETE_CART, item})

/**
 * THUNK CREATORS
 */
export const cart = (id) => async dispatch => {
  const token = storage().getItem(TOKEN)
  if (token) {
    const res = await axios.get(`/api/cart/${id}`)
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

/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case SET_CART:
      return action.cartList
    case DELETE_CART:
      return state.filter((cart) => cart.coffee.id !== action.item.id)
    default:
      return state
  }
}
