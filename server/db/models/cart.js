const Sequelize = require('sequelize')
const { INTEGER, BOOLEAN } = Sequelize;
const db = require('../db')

//carts can have a name and description but it does not seem like they need them right away so not using 
const Cart = db.define('cart', {
    //once a cart is checked out this should be changed to false
    open: {
        type: BOOLEAN,
        defaultValue: true
    },
    //not sure if the validate is really necessary but why not
    // so it looks like this will not be here for sequelize to generate a many to many relationship it creates
    //an intermediary table which will hold the quanitty value
});

module.exports = Cart

