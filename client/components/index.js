/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */

export {default as Header} from './navbar'
export {default as Home} from './home'
export {default as Cart} from './cart'
export {Login, Signup} from './auth-form'
export {default as User} from './User'
export {default as SingleOrder} from './SingleOrder'
export {default as ListofOrders} from './ListofOrders'
export {default as Coffees} from './Coffees'
export {default as Coffee} from './Coffee'
export {default as AdminSingleProductView} from './AdminSingleProductView'
export {default as AdminAllProductView} from './AdminAllProductView'
export {default as AdminAddNewProduct} from './AdminAddNewProduct'


