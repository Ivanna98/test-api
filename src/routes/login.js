const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { secretKey, jwtExpiration } = require('../config');
const UserCollection = require('../models/user');

router.post('/', async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;
    const user = await UserCollection.findOne({ email }).lean().exec();
    if (!user) {
      return res.status(400).json({ error: 'No account found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const payload = {
        id: user._id,
        name: user.name,
      };
      jwt.sign(payload, secretKey, { expiresIn: jwtExpiration },
        (err, token) => {
          if (err) {
            res.status(500).json({ error: 'Error signing token' });
          }
          res.json({ token: `Bearer ${token}` });
        });
    }
  } catch (e) {
    return res.status(400).json({ error: 'Password or email is incorrect' });
  }
});

module.exports = router;
