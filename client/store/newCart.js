import axios from 'axios'


/**
 * ACTION TYPES
 */
const FIND_OPEN_CART = 'FIND_OPEN_CART';
const CREATE_CART = 'CREATE_CART';

/**
 * ACTION CREATORS
 */

const _findOpenCart = (cart) =>{
  return {
      type: FIND_OPEN_CART,
      cart
  };
};

const _createCart = (cart) =>{
  return {
      type: CREATE_CART,
      cart
  };
};


/**
 * THUNK CREATORS
 */

//hopefully just gets the one open cart or is false
export const loadOpenCart = (id) =>{
  console.log('in thunk for loadOpenCart');
  return async(dispatch)=>{
      const cart = (await axios.get(`/api/cart/simple/${id}`)).data;
      console.log(cart);
      if(cart){
        dispatch(_findOpenCart(cart));
      } else {
        dispatch(_findOpenCart([]));
      }
  }
};

export const createCart = (userId)=>{
  return async(dispatch)=>{
      let cart = (await axios.post('/api/cart/newCart', { userId })).data;
      console.log('in thunk');
      console.log(cart);
      dispatch(_createCart(cart));
  }
}

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case FIND_OPEN_CART:
        return action.cart;
    case CREATE_CART:
        return action.cart;
    default:
      return state
  }
}
