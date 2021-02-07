const router = require('express').Router();
const { models: { Coffee, User  }} = require('../db');
module.exports = router;

// If the user is signed in, check to see if they have a stored address. 
// If they do, get it and auto-populate
// If they don't, store it

router.get('/', async (req, res, next) => {
    try{
        
    } catch(ex) {
        next(ex);
    }
})