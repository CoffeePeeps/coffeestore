// Single product

const router = require('express').Router();

const { models: { Coffee } } = require('../db');

// Get all products

router.get('/', async (req, res, next) => {
    try{
        const allCoffee = await Coffee.findAll();
        // TODO: ADD IN ATTRIBUTES
        res.status(201).send(allCoffee);
    } catch(ex) {
        next(ex);
    }
})

// Get single products

router.get('/:productId', async (req, res, next) => {
    try{
        const singleCoffee = await Coffee.findAll({
            where: {
                id: req.params.productId
            }
        });
        res.status(201).send(singleCoffee);

    } catch(ex) {
        next(ex);
    }
})

// FOR ADMIN ACCESS ONLY

// Add new product
router.post('/', async (req, res, next) => {
    try{
        // TODO: MAKE SURE INFO IN ACTION CREATOR
        const newCoffee = await Coffee.create(req.body);

        // TODO: ADD IN ATTRIBUTES
        res.status(201).send(newCoffee);
    } catch(ex) {
        next(ex);
    }
})

// Edit product
router.put('/:productId', async(req, res, next) => {

    try {
        const coffeeToEdit = await Coffee.findAll({
            where: {
                id: req.params.productId
            }
        }); 
        await coffeeToEdit.update(req.body);
        res.status(201);
    } catch(ex) {
        next(ex);
    }

})

// Delete product
router.delete('/:productId', async(req, res, next) => {
    try {
      const coffeeToRemove = await Coffee.findAll({
          where: {
            id: req.params.productId
          }
      });  
      await coffeeToRemove.destroy();

      // TODO: PLAN B -- change to .sendstatus(204);
      res.status(204);

    } catch(ex) {
        next(ex);
    }
})

module.exports = router;
