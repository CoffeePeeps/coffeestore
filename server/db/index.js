//this is the access point for all things database related!

const db = require("./db");

//for my User_Profile
const Sequelize = require("sequelize");

const User = require("./models/user");
const Coffee = require("./models/coffee");
const Cart = require("./models/cart");

//associations could go here!
//a user can have lots of carts though we will just start with one, and each cart needs to belong to one user
User.hasMany(Cart);
Cart.belongsTo(User);

//making a many to many relationship with cart and product. so when we make a many to many relationship
//Sequelize will create a new table that takes the id from each connected table but we also want a quantity
//field so we to define the table with the quantity field here will mov it to it's own file but wanted you guys
// to see it first :)
// TODO - Put this in it's own file and import it
const Cart_Coffee = db.define(
  "cart_coffee",
  {
    quantity: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
  },
  { timestamps: false }
);

Cart.belongsToMany(Coffee, { through: Cart_Coffee });
Coffee.belongsToMany(Cart, { through: Cart_Coffee });
Cart.hasMany(Cart_Coffee);
Cart_Coffee.belongsTo(Cart);
Coffee.hasMany(Cart_Coffee);
Cart_Coffee.belongsTo(Coffee);

// TODO - add a bunch more test data make it more interesting if we want
const syncAndSeed = async () => {
  await db.sync({ force: true });
  //so these were made for testing
  const users = await Promise.all([
    User.create({ email: "cody@email.com", password: "123" }),
    User.create({ email: "murphy@email.com", password: "123" }),
  ]);

  //more test data we will need a lot and we cn be more original just needed to  get it started
  await User.create({ email: "test1@email.com", password: "123" });
  await User.create({ email: "test2@email.com", password: "123" });
  await User.create({ email: "test3@email.com", password: "123" });
  await User.create({ email: "test4@email.com", password: "123" });
  await User.create({ email: "test5@email.com", password: "123" });
  await User.create({ email: "test6@email.com", password: "123" });
  await User.create({ email: "test7@email.com", password: "123" });
  await User.create({ email: "test8@email.com", password: "123" });
  await User.create({ email: "test9@email.com", password: "123" });
  await User.create({ email: "test10@email.com", password: "123" });
  await User.create({ email: "test11@email.com", password: "123" });
  await User.create({ email: "admin1@email.com", password: "123", typeOfUser: 'ADMIN' });

  //mimicking the testing user testing ones not actually using this yet
  const coffees = await Promise.all([
    await Coffee.create({ name: "coffee1" }),
    await Coffee.create({ name: "coffee2" }),
  ]);

  //also more test data, we can also be more original, apperently we do not need an await here, though it might
  //be good practice to put it in..not sure
  await Coffee.create({ name: "coffee3" });
  await Coffee.create({ name: "coffee4" });
  await Coffee.create({ name: "coffee5" });
  await Coffee.create({ name: "coffee6" });
  await Coffee.create({ name: "coffee7" });
  await Coffee.create({ name: "coffee8" });
  await Coffee.create({ name: "coffee9" });
  await Coffee.create({ name: "coffee10" });
  await Coffee.create({ name: "coffee11" });
  await Coffee.create({ name: "coffee12" });

  //cart test data
  await Cart.create({ userId: 1 });
  await Cart.create({ userId: 2, open: "false" });
  await Cart.create({ userId: 3 });
  await Cart.create({ userId: 3, open: "false" });
  await Cart.create({ userId: 5 });
  await Cart.create({ userId: 5, open: "false" });

  await Cart.create({ userId: 6 });
  await Cart.create({ userId: 6, open: "false" });
  await Cart.create({ userId: 7 });
  await Cart.create({ userId: 7, open: "false" });
  await Cart.create({ userId: 8 });
  await Cart.create({ userId: 8, open: "false" });

  //putting things in cart test data
  await Cart_Coffee.create({ quantity: 10, cartId: 1, coffeeId: 4 });
  await Cart_Coffee.create({ quantity: 7, cartId: 1, coffeeId: 2 });

  await Cart_Coffee.create({ quantity: 5, cartId: 2, coffeeId: 2 });
  await Cart_Coffee.create({ quantity: 3, cartId: 2, coffeeId: 1 });
  await Cart_Coffee.create({ quantity: 3, cartId: 2, coffeeId: 3 });

  await Cart_Coffee.create({ quantity: 3, cartId: 3, coffeeId: 2 });
  await Cart_Coffee.create({ quantity: 2, cartId: 3, coffeeId: 1 });
  await Cart_Coffee.create({ quantity: 1, cartId: 3, coffeeId: 3 });

  await Cart_Coffee.create({ quantity: 3, cartId: 4, coffeeId: 8 });
  await Cart_Coffee.create({ quantity: 2, cartId: 4, coffeeId: 7 });
  await Cart_Coffee.create({ quantity: 1, cartId: 4, coffeeId: 6 });
  await Cart_Coffee.create({ quantity: 2, cartId: 4, coffeeId: 1 });
  await Cart_Coffee.create({ quantity: 1, cartId: 4, coffeeId: 2 });

  await Cart_Coffee.create({ quantity: 12, cartId: 5, coffeeId: 7 });
  await Cart_Coffee.create({ quantity: 11, cartId: 5, coffeeId: 6 });

  await Cart_Coffee.create({ quantity: 12, cartId: 6, coffeeId: 3 });
  await Cart_Coffee.create({ quantity: 11, cartId: 6, coffeeId: 4 });

  await Cart_Coffee.create({ quantity: 10, cartId: 7, coffeeId: 11 });
  await Cart_Coffee.create({ quantity: 7, cartId: 7, coffeeId: 9 });

  await Cart_Coffee.create({ quantity: 1, cartId: 8, coffeeId: 2 });
  await Cart_Coffee.create({ quantity: 1, cartId: 8, coffeeId: 1 });
  await Cart_Coffee.create({ quantity: 1, cartId: 8, coffeeId: 3 });

  await Cart_Coffee.create({ quantity: 3, cartId: 9, coffeeId: 9 });
  await Cart_Coffee.create({ quantity: 2, cartId: 9, coffeeId: 8 });
  await Cart_Coffee.create({ quantity: 1, cartId: 9, coffeeId: 7 });

  await Cart_Coffee.create({ quantity: 30, cartId: 10, coffeeId: 8 });
  await Cart_Coffee.create({ quantity: 20, cartId: 10, coffeeId: 7 });
  await Cart_Coffee.create({ quantity: 10, cartId: 10, coffeeId: 6 });
  await Cart_Coffee.create({ quantity: 20, cartId: 10, coffeeId: 1 });
  await Cart_Coffee.create({ quantity: 10, cartId: 10, coffeeId: 2 });

  await Cart_Coffee.create({ quantity: 5, cartId: 11, coffeeId: 7 });
  await Cart_Coffee.create({ quantity: 11, cartId: 11, coffeeId: 3 });

  await Cart_Coffee.create({ quantity: 12, cartId: 12, coffeeId: 10 });
  await Cart_Coffee.create({ quantity: 3, cartId: 12, coffeeId: 4 });

  const [cody, murphy] = users;
  const [coffe1, coffee2] = coffees;

  return {
    users: {
      cody,
      murphy,
    },
    coffees: {
      coffe1,
      coffee2,
    },
  };
};

module.exports = {
  db,
  syncAndSeed,
  models: {
    User,
    Coffee,
    Cart,
    Cart_Coffee,
  },
};
