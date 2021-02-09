const router = require('express').Router();
const { Sequelize } = require('sequelize');
const { models: { User, Coffee, Cart_Coffee, Cart }  } = require('../db');

// Shows list of closed carts (aka orders) for a given user
router.get('/:userId', async (req, res, next) => {
    try{
        const listOfClosedCarts = await Cart.findAll({
            where: {
                id: req.params.userId,    
                open: 'false'
            }
        });
        res.status(201).send(listOfClosedCarts);
    } catch(ex) {
        next(ex);
    }
})


// Shows list of ordered coffees for a given closed cart (aka order) and given user
// Also pulls coffee information to provide order details
router.get('/:userId/:cartId', async (req, res, next) => {
    try{     
        let orderedCoffees = await Cart_Coffee.findAll({
            include: [{
                model: Cart,
                where: {
                    id: req.params.cartId,    
                    open: 'false',
                },
                include: [{
                    model: Coffee,
                }],
            }] 
        });

        // for (let i = 0; i < orderedCoffees.length; i++) {

        //     orderedCoffees[i].cart.coffees = ['hihi'];

        //     // for (let j = 0; j < coffeeArr.length; j++) {
                
        //     //     if (coffeeArr[j].id === orderedCoffees[i].coffeeId) {
        //     //         console.log('THIS IS IT!!!!!')
        //     //         console.log(coffeeArr[j].dataValues);
        //     //         // orderedCoffees[i].cart.coffees = coffeeArr[j];
        //     //         // console.log(orderedCoffees[i].singleCoffee)
        //     //         orderedCoffees[i].singleCoffee = coffeeArr[j].dataValues;
        //     //         // console.log(orderedCoffees[i].singleCoffee)
        //     //     }

        //     // }
        // }

        
        res.status(201).send(orderedCoffees);
    } catch(ex) {
        next(ex);
    }
})

module.exports = router;