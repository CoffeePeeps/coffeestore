const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_TEST_API_KEY);

const { models: { Coffee, User, Cart  }} = require('../db');
module.exports = router;

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

router.post("/session", async (req, res, next) => {
    const {cart, user} = req.body
    console.log(cart, user)
})
