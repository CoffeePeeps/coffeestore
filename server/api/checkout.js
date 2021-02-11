const router = require('express').Router();
const { models: { Coffee, User, Cart  }} = require('../db');
module.exports = router;

// If the user is signed in, check to see if they have a stored address.
// If they do, get it and auto-populate
// If they don't, store it

// cart checkout happens on put request, update existing cart open to false
// assign that user a new empty cart

router.put("/:uid/:cartId", async (req, res, next) => {
    try {
        const cart = await Cart.findOne({
            where: {userId: req.params.uid, id: req.params.cartId}
        })

        if(req.body.payment === "success"){
            cart.open = false
            await Cart.create({userId: req.params.uid})
            await cart.save()
        }

        res.sendStatus(204)
    } catch (ex) {
        next(ex)
    }
})
