//this is the access point for all things database related!

const db = require('./db')

//for my User_Profile
const Sequelize = require('sequelize')

const User = require('./models/user');
const Product = require('./models/product');
const Cart = require('./models/cart');

//associations could go here!
//a user can have lots of carts though we will just start with one, and each cart needs to belong to one user
User.hasMany(Cart);
Cart.belongsTo(User);

//making a many to many relationship with cart and product. so when we make a many to many relationship
//Sequelize will create a new table that takes the id from each connected table but we also want a quantity 
//field so we to define the table with the quantity field here will mov it to it's own file but wanted you guys
// to see it first :) 
const Cart_Product = db.define('cart_product', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
    validate: {
    min: 0
    }
}
}, { timestamps: false });

Cart.belongsToMany(Product, { through: Cart_Product});
Product.belongsToMany(Cart, { through: Cart_Product});


const syncAndSeed =  async()=> {
  await db.sync({force: true})
  //so these were made for testing
  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
]);

//more test data we will need a lot and we cn be more original just needed to  get it started
await User.create({email: 'test1@email.com', password: '123'});
await User.create({email: 'test2@email.com', password: '123'})

//mimicking the testing user testing ones not actually using this yet 
const products = await Promise.all([
  Product.create({name: 'coffee1'}),
  Product.create({name: 'coffee2'})
])

//also more test data, we can also be more original, apperently we do not need an await here, though it might
//be good practice to put it in..not sure  
Product.create({name: 'coffee3'})
Product.create({name: 'coffee4'})

//cart test data
Cart.create({userId: 1})


//putting things in cart test data
Cart_Product.create({quantity: 10, cartId: 1, productId: 4})
Cart_Product.create({quantity: 7, cartId: 1, productId: 2})

const [cody, murphy] = users;
const [coffe1, coffee2] = products;

  return {
    users: {
      cody,
      murphy
    },
    products: {
      coffe1,
      coffee2
    }
  };
}

module.exports = {
  db,
  syncAndSeed,
  models: {
    User,
    Product,
    Cart,
    Cart_Product
  }
}
