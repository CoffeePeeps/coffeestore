// import React, {Component, Fragment} from 'react'
// import {connect} from 'react-redux'
// import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
// import {Login, Signup, Home, User, SingleOrder, Cart, Coffee,
//         AdminSingleProductView, AdminAllProductView, AdminAddNewProduct} from './components/index'
// import {me} from './store'

// /**
//  * COMPONENT
//  */
// class Routes extends Component {
//   componentDidMount() {
//     this.props.loadInitialData()
//   }

//   render() {
//     const {isLoggedIn} = this.props;
//     return (

//       <div>
//         {isLoggedIn ? (
//           <Switch>
//             <Route path="/home" component={Home} />
//             <Route path="/cart" component={Cart}/>
//             <Route component={ Coffee } path = '/coffee/:id' exact/>
//             <Redirect to="/home" />
//           </Switch>


//         ) : (
//           <Switch>
//             <Route path="/login" component={Login} />
//             <Route path="/signup" component={Signup} />

//             <Route path="/user/:userId" component={User} />
//             <Route path="/orderHistory/:userId/:orderId" component={SingleOrder} />

//             <Route path="/admin/allCoffees" component = {AdminAllProductView}/>
//             <Route path="/admin/singleCoffee/:coffeeId" component = {AdminSingleProductView}/>
//             <Route path="/admin/addNewCoffee" component = {AdminAddNewProduct}/>
//             <Redirect to="/login" />
//           </Switch>
//         )}
//       </div>


//     )
//   }
// }

// /**
//  * CONTAINER
//  */
// const mapState = state => {
//   return {
//     // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
//     // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
//     isLoggedIn: !!state.auth.id
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     loadInitialData() {
//       dispatch(me())
//     }
//   }
// }

// // The `withRouter` wrapper makes sure that updates are not blocked
// // when the url changes
// export default withRouter(connect(mapState, mapDispatch)(Routes))

import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import {Login, Signup, Home, User, SingleOrder, Cart, Coffee, 
        AdminSingleProductView, AdminAllProductView, AdminAddNewProduct} from './components/index'
import {me} from './store'

// React Notification
import { NotificationContainer } from 'react-notifications';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn, isAdmin} = this.props;
    console.log('HOME PROPS!!')
    console.log(this.props);

    return (

      <div>
        {isAdmin ? (
        <Switch>
            <Route path="/home" component={Home} />
            <Route path="/cart" component={Cart}/>
            <Route component={ Coffee } path = '/coffee/:id' exact/>
            <Route path="/user" component={User} />
            <Route path="/orderHistory/:orderId" component={SingleOrder} />
            <Route path="/admin/allCoffees" component = {AdminAllProductView}/>
            <Route path="/admin/singleCoffee/:coffeeId" component = {AdminSingleProductView}/>
            <Route path="/admin/addNewCoffee" component = {AdminAddNewProduct}/>
        </Switch>  
        ) 
        : 
        (isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/cart" component={Cart}/>
            <Route component={ Coffee } path = '/coffee/:id' exact/>
            <Route path="/user" component={User} />
            <Route path="/orderHistory/:orderId" component={SingleOrder} />
            <Redirect to="/home" />
          </Switch>  
        ) : (
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Redirect to="/login" />
          </Switch>
        ))}
      <NotificationContainer />
      </div>


    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  console.log(state);
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    isAdmin: (state.auth.typeOfUser === 'ADMIN')
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))