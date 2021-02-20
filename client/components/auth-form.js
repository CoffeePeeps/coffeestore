import React, { Component } from 'react'
import {connect} from 'react-redux'
import {authenticate} from '../store'
import Coffees from "./Coffees";

/**
 * COMPONENT
 */
class AuthForm extends Component{
  constructor(props) {
    super(props);
    this.state = {
      guest: false
    };
  
    this.setGuest = this.setGuest.bind(this);
  }

  setGuest(){
    // just toggling between true and false to either show or not show products not sure if this is the
    // way to handle it but it's a way  
    this.setState({guest: !this.state.guest})  
  }


  render (){
    
    const {name, displayName, handleSubmit, error} = this.props;
  return (
      <div>
        <div>
          <form onSubmit={handleSubmit} name={name}>
            <div>
              <label htmlFor="email">
                <small>Email</small>
              </label>
              <input name="email" type="text" />
            </div>
            <div>
              <label htmlFor="password">
                <small>Password</small>
              </label>
              <input name="password" type="password" />
            </div>
            <div>
              <button type="submit">{displayName}</button>
            </div>
            {error && error.response && <div> {error.response.data} </div>}
          </form>
          <br/>
            <button onClick={()=>{this.setGuest()}}>guest</button>
          {
            window.githubURL && <a href={window.githubURL}>Login / Register Via Github </a>
          }
        </div>
        {this.state.guest &&
        (
          <div>
            <Coffees />
          </div>
        )
        } 
      </div>  
    )
  }
}    

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(authenticate(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)
