const express = require('express');

const router = express.Router();
const bcrypt = require('bcryptjs');
const UserCollection = require('../models/user');
const generateToken = require('../utils/generateToken');
const { loginSchema } = require('./validator');

router.post('/', async (req, res) => {
  try {
    const {
      email,
      password,
    } = await loginSchema.validateAsync(req.body);
    const user = await UserCollection.findOne({ email }).lean().exec();
    if (!user) {
      return res.status(402).json({ error: 'No account found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const payload = {
        id: user._id,
        name: user.name,
      };
      const token = await generateToken(payload);
      return res.json({ token: `Bearer ${token}` });
    }
    throw Error('Password or email is incorrect');
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

module.exports = router;
