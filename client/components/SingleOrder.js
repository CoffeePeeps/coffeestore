import React from 'react';
import { connect } from 'react-redux'
import { fetchSingleOrder } from '../store/singleOrder'


/**
 *  Renders a single order that has been placed for a customer
 * 
 * Includes:
 *  Order Number : Cart (cartId)
 *  Order Date (updatedAt from Cart - should stop updating after it has been flipped to False)
 * 
 *  Coffee Name : Coffee 
 *  Coffee Description : Coffee
 *  Price : Coffee
 *  Quantity : Cart_Coffee (quantity
 * 
 *  Total : To Be Calculated
//  */

export class SingleOrder extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {     
       this.props.loadSingleOrder(this.props.match.params.userId, this.props.match.params.orderId);
       debugger;
    }

    render() {

        // TODO Validation checks
        // Define variables
        let number;
        console.log(this.props);


        return (
            <div>
                <h1>Order Number {number}</h1>
                <h2>Order Details</h2>


            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        order: state.order
    }

}

function mapDispatchToProps(dispatch) {
    debugger;
    return {
        loadSingleOrder(userId, orderId) {
            dispatch(fetchSingleOrder(userId, orderId));
        } 
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SingleOrder);
