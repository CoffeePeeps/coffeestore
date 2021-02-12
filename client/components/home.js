import React from 'react'
import {connect} from 'react-redux'
import Coffees from './Coffees'

/**
 * COMPONENT
 */
export const Home = props => {
  // console.log('in home')
  console.log(props)
  const {email} = props

  return (
   <div>
   <div>
      <h3>Welcome, {email}</h3>
   </div>
   <div>
     {/* Putting Coffees in home */}
     <Coffees />
   </div>
   </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.auth.email,
    newCart: state.auth.newCart,
  }
}



export default connect(mapState)(Home)
