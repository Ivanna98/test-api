const chai = require('chai');

const app = require('../src/index');
const utils = {
  signup: async data => chai
    .request(app)
    .post('/signup')
    .send(data),
  login: async data => chai
    .request(app)
    .post('/login')
    .send(data),
}
module.exports = utils;