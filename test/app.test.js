const app = require('../app');
const expect = require('chai').expect;
const request = require('supertest');


describe('app.js', () => {
  describe('GET /', () => {
    it('Returns a message', () => {
      return request(app)
        .get('/')
        .expect(200, 'Hello World!');
    });
  });
});
