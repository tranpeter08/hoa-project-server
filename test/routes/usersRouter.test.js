const app = require('../../src/app');
const request = require('supertest');

describe('usersRouter.js', () => {
  describe('POST /login', () => {
    it('Validates request', () => {
      return request(app)
        .post('/users/login')
        .send({usernme: 'test'})
        .expect(400, {message: ''});
    });
  });
});
