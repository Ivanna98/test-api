const chai = require('chai');
const chaiHttp = require('chai-http');
const UserCollection = require('../src/models/user');

const { signupData, loginData, loginWrongData} = require('./mock');
const {signup, login} = require('./utils');
const { assert } = chai;
chai.use(chaiHttp);

describe('Auth', () => {
  beforeEach(async () => {
    await UserCollection.deleteMany({});
  })

  it('Should signup and login with correct input', async () => {
    const signupRes = await signup(signupData);
    assert.equal(signupRes.status, 200);
    const loginRes = await login(loginData);
    assert.equal(loginRes.status, 200);
  });

  it('Should return token after login', async () => {
    await signup(signupData);
    const loginRes = await login(loginData);
    assert.exists(loginRes.body.token, 'Token does not exist');
    assert.typeOf(loginRes.body.token, 'string');
  });

  it('Should throw error when user already exist', async () => {
    await signup(signupData);
    const signupRes = await signup(signupData)
    assert.equal(signupRes.status, 400);
  });
  
  it('Should throw error when password or email is wrong', async () => {
    await signup(signupData);
    const loginRes = await login(loginWrongData);
    assert.equal(loginRes.status, 400);
  });
});
