
const mock = {
  signupData: {
    name: 'Jhon',
    email: 'jhon@mail.io',
    password: 'qwerty123'
  },
  loginData: {
    email: 'jhon@mail.io',
    password: 'qwerty123'
  },
  loginWrongData: {
    email: 'Other',
    password: 'Anything',
  },
  updateData : {
    title: 'newTitle',
    content: 'newContent',
    tags: ['tag1', 'tag2'],
    category: 'category'
  },
  postData : {
    title: 'title',
    content: 'content',
    tags: ['tag1', 'tag2'],
    category: 'category'
  },
};
module.exports = mock;
