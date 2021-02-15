// Single product

const router = require('express').Router();

const { models: { Coffee } } = require('../db');

// Get all products

router.get('/', async (req, res, next) => {
    try{
        const allCoffee = await Coffee.findAll({  
            order: [
            ['id', 'ASC'] 
            ]
        });
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
        const coffeeToEdit = await Coffee.findOne({
            where: {
                id: req.params.productId
            }
        }); 
        await coffeeToEdit.update(req.body);
        // res.sendStatus(201);
    } catch(ex) {
        next(ex);
    }

})

// slightly different edit
router.put('/stock/:productId', async(req, res, next) => {
    try {
        const coffeeToEdit = await Coffee.findOne({
            where: {
                id: req.params.productId
            }
        }); 
        console.log(coffeeToEdit);
        coffeeToEdit.stock = req.body.stock;
        // // console.log(req.body.quantity)  
        await coffeeToEdit.save();
        res.sendStatus(201);
    }
    catch(ex) {
        next(ex);
    }
  
})

// Delete product
router.delete('/:productId', async(req, res, next) => {
    try {
      const coffeeToRemove = await Coffee.findOne({
          where: {
            id: req.params.productId
          }
      });  
      await coffeeToRemove.destroy();
      res.sendStatus(204);

    } catch(ex) {
        next(ex);
    }
})

module.exports = router;
