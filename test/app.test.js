const app = require('../src/app');
const {expect} = require('chai');
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
