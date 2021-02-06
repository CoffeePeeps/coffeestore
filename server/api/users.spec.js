/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const { db, syncAndSeed, models: { User } } = require('../db')
const app = require('../app')

describe('User routes', () => {
  beforeEach(async() => {
    await syncAndSeed();
  })

  describe('/api/users/', () => {

    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array');
      expect(res.body.length).to.equal(2);
    })
  }) // end describe('/api/users')
}) // end describe('User routes')

// test for future use - making sure deleting product from cart works
describe('Cart routes', function() {
  beforeEach(async() => {
    await syncAndSeed();
  })

  describe('/api/cart/:userid/:productid', () => {

    it('DELETE /api/cart/:userid/:productid', async () => {
      const res = await request(app)
        .delete('/api/cart/1/4')
        .expect(200)

      expect(res.body).to.be.an('array');
      expect(res.body.coffeeId).to.equal(4);

    });

  });

});
