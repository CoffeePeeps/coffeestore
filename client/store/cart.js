import axios from 'axios'

const storage = () => window.localStorage
const TOKEN = 'token'

/**
 * ACTION TYPES
 */
const SET_CART = 'SET_CART';
const ADD_NEW_COFFEE = 'ADD_NEW_COFFEE';
// const CREATE_CART = 'CREATE_CART';

/**
 * ACTION CREATORS
 */
const setCart = cartList => ({type: SET_CART, cartList})

const _addNewCoffee = (cart) =>{
  return {
      type: ADD_NEW_COFFEE,
      cart
  };
};

// const _createCart = (cart) =>{
//   return {
//       type: CREATE_CART,
//       cart
//   };
// };


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

// hopefully just gets the one open cart or is false
export const addNewCoffee = (quantity, cartId, coffeeId) =>{
  console.log('in thunk for addnewCoffe');
  return async(dispatch)=>{
    if(!cartId){

      // create cart for user here
    } else {
        // create a cart for the user 
        let cart_coffee = (await axios.post('/api/cart/', { quantity, cartId, coffeeId })).data;
        //console.log('in thunk');
        // console.log(cart);
        dispatch(_addNewCoffee(cart_coffee));
      }

      }
  };

// export const createCart = (userId)=>{
//   return async(dispatch)=>{
//       let cart = (await axios.post('/api/cart/newCart', { userId })).data;
//       console.log('in thunk');
//       console.log(cart);
//       dispatch(_createCart(cart));
//   }
// }

/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case SET_CART:
      return action.cartList;
    case ADD_NEW_COFFEE:
        return [...state, action.cart];
    // case CREATE_CART:
    //     return action.cart;
    default:
      return state
  }
}
