const router = require('express').Router();
const { models: {User}  } = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      // attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// View specific user's account information
router.get('/:userId', async(req, res, next) => {
  try {
      const user = await User.findAll({
          where: {
              id: req.params.userId
          }
      });  
      console.log(user);
      res.json(user)
      
      res.status(201);
  }
  catch(ex) {
      next(ex);
  }
})

// user profile

// Create user/account
router.post('/', async (req, res, next) => {
  try{
      // TODO: MAKE SURE INFO IN ACTION CREATOR
      const newUser = await User.create(req.body);

      // TODO: ADD IN ATTRIBUTES
      res.status(201).send(newUser);
  } catch(ex) {
      next(ex);
  }
})


// Update user/account
router.put('/:userId', async(req, res, next) => {
  try {
      const user = await User.findAll({
          where: {
              id: req.params.userId
          }
      });  
      await user.update(req.body);
      res.status(201);
  }
  catch(ex) {
      next(ex);
  }
})

module.exports = router;
