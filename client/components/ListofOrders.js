import React from 'react'
import { Link } from 'react-router-dom'

const ListofOrders = (props) => {
    const orders = props.props;
    if (orders.length) {
        return (
            <div>
                <ul> 
                    {
                        orders.map((order, index) => 
                        <li key = {index}>
                            <Link to = { `/orderHistory/${order.id}` }>
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
