import axios from 'axios'

const storage = () => window.localStorage
const TOKEN = 'token'

/**
 * ACTION TYPES
 */
const SET_CART = 'SET_CART'
const FIND_OPEN_CART = 'FIND_OPEN_CART'

/**
 * ACTION CREATORS
 */
const setCart = cartList => ({type: SET_CART, cartList})

//const findOpenCart = cartList => ({type: SET_CART, cartList})
const _findOpenCart = (cart) =>{
  return {
      type: FIND_OPEN_CART,
      cart
  };
};


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

//hopefully just gets the one open cart or is false
export const loadOpenCart = (id) =>{
  console.log('in thunk for loadOpenCart');
  return async(dispatch)=>{
      const cart = (await axios.get(`/api/cart/simple/${id}`)).data;
      
      dispatch(_findOpenCart(cart));
  }
};

/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case SET_CART:
      return action.cartList;
    case FIND_OPEN_CART:
        return action.cart;
    default:
      return state
  }
}
