import React from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'

const ListofOrders = (props) => {
    const ordersArr = props.props;

    if (ordersArr.length) {
        return (
            <div>
                <ul> 
                    {
                        ordersArr.map((order, index) => 
                        <li key = {index}>
                            <Link to = { `/orderHistory/${order.userId}/${order.id}` }>
                            { order.updatedAt } : Order #{ order.id }
                            </Link>
                        </li>
                        )
                    }
                </ul>
            </div>
        )
    } else {
        return (
            <div>

            </div>
        )
    }
    
}

export default ListofOrders;
