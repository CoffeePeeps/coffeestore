import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import {Login, Signup, Home, User, Coffees, Coffee} from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (

      <div>
        {isLoggedIn ? (
          <div>
          <Switch>
            <Route path="/home" component={Home} />
            {/* could not use hash router with this */}
            {/* <Redirect to="/home" /> */}
          </Switch>

          {/* so when you first login or refresh the page you go directly
          to the home page, it's essentially the refresh but still let's use hastchange */}
          <Route path="/login" component={Home} />
          <Route path="/coffees" component={Coffees}/>
          <Route component={ Coffee } path = '/coffee/:id' exact/>
          </div>
        ) : (
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/user/:userId" component={User} />
            <Redirect to="/login" />
          </Switch>
        )}
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
