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
    }

    render() {
        let orderArr = this.props.order;

        console.log(orderArr)

        // TODO: Convert order time

        if (orderArr.length) {
            return (
                <div>
                    <h1>Order Number: {this.props.match.params.orderId}</h1>
                    <h2>Order Details</h2>
                    
                    <h3>Order Date: { orderArr[0].cart.updatedAt }</h3>
                    { 
                        orderArr.map((elem, index) => {
                            return (
                            <div key = {index}>   
                            <h4>{ elem.coffeeInfo.name }</h4>   
                            <p> Description: { elem.coffeeInfo.description } </p>
                            <p> Price: { elem.coffeeInfo.price } </p>
                            <p> Quantity: { elem.quantity } </p>
                            </div>
                            )
                        })
                    }   
                    <h4> Total: { orderArr.total } </h4>
                </div>
            )
        } else {
            return (
                <p>Order Does Not Exist: Please contact our customer support!</p>
            )
        }
      
    }
}

function mapStateToProps(state) {
    return {
        order: state.order
    }

}

function mapDispatchToProps(dispatch) {
    return { 
        loadSingleOrder(userId, orderId) {
            dispatch(fetchSingleOrder(userId, orderId));
        } 
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SingleOrder);
