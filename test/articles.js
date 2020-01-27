const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/index');
const UserCollection = require('../src/models/user');
const ArticlesCollection = require('../src/models/article');

const { signupData, loginData, postData, updateData } = require('./mock');
const { signup, login, post } = require('./utils');

const { assert } = chai;
chai.use(chaiHttp);
describe('Articles', () => {
  beforeEach(async () => {
    await ArticlesCollection.deleteMany({});
    await UserCollection.deleteMany({});

  })
  describe('Post', () => {
    it('Should return article with right keys', async () => {
      await signup(signupData);
      const { body } = await login(loginData);
      const token = body.token;
      const postRes = await post(postData, { token });
      assert.equal(postRes.status, 200);
      assert.containsAllKeys(postRes.body, postData);
    });
    it('Should return article with right data', async () => {
      await signup(signupData);
      const { body } = await login(loginData);
      const token = body.token;
      const postRes = await post(postData, { token });
      assert.equal(postRes.body.title, postData.title);
    });
  });
  describe('Get', () => {
    it('Should return all articles', async () => {
      await signup(signupData);
      const { body } = await login(loginData);
      const token = body.token;
      await post(postData, { token });
      await post(postData, { token });
      await post(postData, { token });
      const getRes = await chai
        .request(app)
        .get('/articles')
        .send();
      assert.lengthOf(getRes.body.articles, 3);
    });
  });
  describe('Delete', () => {
    it('Should return ', async () => {
      await signup(signupData);
      const { body } = await login(loginData);
      const token = body.token;
      const postRes = await post(postData, { token });
      const id = postRes.body._id;
      const getRes = await chai
        .request(app)
        .get(`/articles/${id}`)
        .send();
      assert.equal(getRes.status, 200);
      await chai
      .request(app)
      .delete(`/articles/${id}`)
      .set('Authorization', token)
      .send();
      const getNewRes = await chai
        .request(app)
        .get(`/articles/${id}`)
        .send();
      assert.equal(getNewRes.body, null);
    });
  });
  describe('Put', () => {
    it('Should return new data', async () => {
      await signup(signupData);
      const { body } = await login(loginData);
      const token = body.token;
      const postRes = await post(postData, { token });
      const id = postRes.body._id;
      const putRes = await chai
        .request(app)
        .put(`/articles/${id}`)
        .set('Authorization', token)
        .send(updateData);
      assert.equal(putRes.body.updateArticle.title, 'newTitle');
      assert.equal(putRes.body.updateArticle.content, 'newContent');
    });
  })
});