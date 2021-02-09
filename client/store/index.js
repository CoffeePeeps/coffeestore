import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import auth from './auth'
import cart from './cart'
import user from './user'

import product from './product'

const reducer = combineReducers({ 
  auth, 
  user,
<<<<<<< HEAD
  cartList: cart
=======
  product
>>>>>>> coffee-store-component
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
<<<<<<< HEAD
export * from "./cart"
=======
export * from './product'
>>>>>>> coffee-store-component
