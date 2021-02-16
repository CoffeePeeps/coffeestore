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
    return dispatch(setCart([]))
  }
}

// should probably be seperated out a bit
export const addNewCoffee = (quantity, userId, coffeeId) =>{
  return async(dispatch)=>{
    //try and find an open cart for user
    let cart = (await axios.get(`/api/cart/simple/${userId}`)).data;

    if(!cart){
      // user does not have an open cart create one
      cart = (await axios.post('/api/cart/newCart', { userId })).data;
    }

    //check the contents of the cart
    let contents = (await axios.get(`/api/cart/${userId}`)).data;
    let newCoffee = true;

    //see if they already have the coffee in the cart
    for (let i=0; i<contents.length; i++){
            if(contents[i].coffeeId * 1 === coffeeId * 1){
                newCoffee = false;
            }
        }

    const cartId = cart.id;

    // they don't have that kind of coffee in their cart so add it
    if (newCoffee){
        let cart_coffee = (await axios.post('/api/cart/', { quantity, cartId, coffeeId })).data;
        // TODO ADD_ITEM reducer could be called here
    } else {
      //updates the quanity of coffee in cart
      let cart_coffee = (await axios.put(`/api/cart/${cartId}/${coffeeId}`, { quantity })).data;
      // TODO UPDATE_ITEM could be called here
    }

    // reloading the entire cart, it is overkill but it works will refine later
    contents = (await axios.get(`/api/cart/${userId}`)).data;
    dispatch(setCart(contents));
  }
};


/**
 * REDUCER
 */
const initState = {
  total: 0.00,
  cart: []
}

export default function(state = initState, action) {
  switch (action.type) {
    case SET_CART:
      return {total: subtotal(action.cartList), cart: action.cartList}
    case DELETE_ITEM:
      const items = state.cart.filter((cart) => cart.coffee.id !== action.item.id)
      items.total = subtotal(items)
      return {total: subtotal(items), cart: items}
    case CHECKOUT_CART:
      console.log(action, state)
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

  total = Math.round(total*100)/100

  return total.toString()
}
