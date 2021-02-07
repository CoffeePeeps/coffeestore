import React from 'react'
import {connect} from 'react-redux'

const Cart = ({coffeeList}) => {
  return(
    <div>
      <h1>Cart</h1>

      <table>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th>QTY</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {coffeeList.map(c => (
            <tr key={c.id}>
              <td><button>X</button></td>
              <td>{c.name}</td>
              <td>{c.quantity}</td>
              <td>{c.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const mapState = state => {
  return {
    coffeeList: [
      {id: 0, name: "Coffee1", quantity: 1, total: "5.99", currency: "$"},
      {id: 1, name: "Coffee2", quantity: 10, total: "59.99", currency: "$"},
      {id: 2, name: "Coffee3", quantity: 4, total: "10.00", currency: "$"},
      {id: 3, name: "Coffee4", quantity: 3, total: "15.50", currency: "$"}
    ]
  }
}

export default connect(mapState)(Cart)
