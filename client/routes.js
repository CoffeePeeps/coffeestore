import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import {Login, Signup, Home, User, SingleOrder, Cart, Coffee,
        AdminSingleProductView, AdminAllProductView, AdminAddNewProduct} from './components/index'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props;
    return (
      //Comment to update
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
      </div>


    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id
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
