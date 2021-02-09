<<<<<<< HEAD
require("dotenv").config();
=======
/**
 * In your development environment, you can keep all of your
 * app's secret API keys in a file called `secrets.js`, in your project
 * root. This file is included in the .gitignore - it will NOT be tracked
 * or show up on Github. On your production server, you can add these
 * keys as environment variables, so that they can still be read by the
 * Node process on process.env
 */
require('dotenv').config();
>>>>>>> coffee-store-component

const { db, syncAndSeed } = require('./db')
const PORT = process.env.PORT || 8080
const app = require('./app')

const init = async () => {
  try {
    if(process.env.SEED){
      await syncAndSeed();
    }
    else {
      await db.sync()
    }
    // start listening (and create a 'server' object representing our server)
    // sorry the mixing it up was really bothering me
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
  } catch (ex) {
    console.log(ex)
  }
}

init()
