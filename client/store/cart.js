import axios from 'axios'

const storage = () => window.localStorage
const TOKEN = 'token'

/**
 * ACTION TYPES
 */
const SET_CART = 'SET_CART'

/**
 * ACTION CREATORS
 */
const setCart = cartList => ({type: SET_CART, cartList})

/**
 * THUNK CREATORS
 */
export const cart = (id) => async dispatch => {
  const token = storage().getItem(TOKEN)
  if (token) {
    const res = await axios.get(`/api/cart/${id}`)
    return dispatch(setCart(res.data))
  }
}

/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case SET_CART:
      return action.cartList
    default:
      return state
  }
}
