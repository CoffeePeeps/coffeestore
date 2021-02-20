import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import { fetchSingleUser, fetchUserOrders } from '../store/user'


import ListofOrders from '../components/ListofOrders'

const User = ({auth, user, loadUserInformation, loadUserOrders}) => {

    useEffect(() => {
        loadUserInformation(auth.id),
        loadUserOrders(auth.id)
    }, [loadUserInformation])
    
    console.log('USER>ORDERS', user.orders)
    return (
        <div>
            <h1>Hi!</h1>
            <p>Thank you for being one of our first customers! Customer #{ auth.id }</p>
            <p>This is the email we have on file for you: { auth.email } </p> 
            <p>Here are your past orders:</p>
            <ListofOrders props = { user.orders }/>
        </div>
    )
  }
  
  const mapState = ({auth, user}) => {
    return {
      auth,
      user
    }
  }
  
  const mapDispatch = dispatch => {
    return {
        loadUserInformation(userid) {
            dispatch(fetchSingleUser(userid));
        },
        loadUserOrders(userid) {
            dispatch(fetchUserOrders(userid));
            } 
        }
  }
  
  export default connect(mapState, mapDispatch)(User);
  