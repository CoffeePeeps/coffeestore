const Sequelize = require('sequelize')
const { STRING, INTEGER, BOOLEAN } = Sequelize;
const db = require('../db')

//carts can have a name and description but it does not seem like they need them right away so not using 
const Cart = db.define('cart', {
    //once a cart is checked out this should be changed to false
    open: {
        type: BOOLEAN,
        defaultValue: true
    },
    //not sure if the validate is really necessary but why not
    quantity: {
        type: INTEGER,
        defaultValue: 0,
        allowNull: false,
        validate: {
        min: 0
        }
    }
});

module.exports = Cart

