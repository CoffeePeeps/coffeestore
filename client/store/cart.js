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
  
    //console.log(contents); 
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
