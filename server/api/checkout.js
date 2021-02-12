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
        let cart = await Cart.findOne({
            where: {userId: req.params.uid, id: req.params.cartId}
        })

        if(cart.open === false){
            const error = new Error("Cart Alredy Closed")
            error.status = 400
            throw error
        }

        if(req.body.payment === "success"){
            cart.open = false
            await cart.save()
            res.sendStatus(204)
        }else{
            const error = new Error("Failed Payment")
            error.status = 402
            throw error
        }
    } catch (ex) {
        next(ex)
    }
})
