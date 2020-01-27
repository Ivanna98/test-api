const express = require('express');

const router = express.Router();
const bcrypt = require('bcryptjs');
const UserCollection = require('../models/user');

router.post('/', async (req, res) => {
  try {
    const {
      name,
      password,
      email,
    } = req.body;
    if (await UserCollection.findOne({ email })) {
      return res.status(400).json({ error: 'User already exist' });
    }
    const newUser = new UserCollection({
      name,
      password,
      email,
    });
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        throw err;
      }
      bcrypt.hash(newUser.password, salt,
        async (err2, hash) => {
          if (err2) {
            throw err2;
          }
          newUser.password = hash;
          await newUser.save();
          console.log(newUser.password);
          res.status(200).end();
        });
    });
  } catch (err) {
    return res.status(400).end();
  }
});

module.exports = router;
