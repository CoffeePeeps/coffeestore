import React from 'react'
import { connect } from 'react-redux'
import { fetchSingleUser, fetchUserOrders } from '../store/user'


import ListofOrders from '../components/ListofOrders'



export class User extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadUserInformation(this.props.match.params.userId);
        this.props.loadUserOrders(this.props.match.params.userId);
    }

    render() {
        // TODO: MAKE A MORE GENERALIZED VALIDATION METHOD
        
        let id = '';
        let email = '';
        if (this.props.user.user.length) {
            id = this.props.user.user[0].id;
            email = this.props.user.user[0].email;
        }         
        
        return (
            <div>
                <h1>Hi!</h1>

                <p>Thank you for being one of our first customers! Customer #{ id }</p>
                <p>This is the email we have on file for you: { email }</p>
                <p>Here are your past orders:</p>
                <ListofOrders props = { this.props.user.orders }/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadUserInformation(userid) {
          dispatch(fetchSingleUser(userid));
        },
        loadUserOrders(userid) {
            dispatch(fetchUserOrders(userid));
          } 
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);