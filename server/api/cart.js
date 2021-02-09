const router = require('express').Router();

const { models: { Coffee, Cart_Coffee, Cart } } = require('../db');

// Shows open cart for a given user
router.get('/:userId', async (req, res, next) => {
    try{
        const cartItems = await Cart_Coffee.findAll({
            include: [{
              model: Cart,
              where: {
                open: 'true',
                id: req.params.userId, 
              }  
            }],
        });
        res.status(201).send(cartItems);
    } catch(ex) {
        next(ex);
    }
})

// Add a new object to cart
router.post('/', async (req, res, next) => {
    try{
        // TODO: MAKE SURE INFO IN ACTION CREATOR
        const newCoffee = await Cart.create(req.body);

        // TODO: ADD IN ATTRIBUTES
        res.status(201).send(newCoffee);
    } catch(ex) {
        next(ex);
    }
})

// Remove object from cart by joining cart and cart_coffee and pulling coffee table
router.delete('/:userId/:productId', async(req, res, next) => {
    try {
      const coffeeToRemove = await Cart_Coffee.findOne({
        include: [{
          model: Cart,
          where: {
            open: 'true',
            id: req.params.userId, 
          },       
        }],
        where: {
            coffeeId: req.params.productId
          }
    });

    await coffeeToRemove.destroy();
    res.sendStatus(200);

    } catch(ex) {
        next(ex);
    }
})


// Update existing object in cart (quantity)
router.put('/:userId', async(req, res, next) => {

    try {
        const cartItems = await Cart_Coffee.findAll({
            include: [{
              model: Cart,
              on: {
                open: 'true',
                id: req.params.userId, 
              }
            }]
        });
    
        await cartItems.update(req.body);
        res.sendStatus(201);
    }

    catch(ex) {
        next(ex);
    }

})

module.exports = router;