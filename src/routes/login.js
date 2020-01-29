const express = require('express');

const router = express.Router();
const bcrypt = require('bcryptjs');
const UserCollection = require('../models/user');
const generateToken = require('../utils/generateToken');

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
      const token = await generateToken(payload);
      return res.json({ token: `Bearer ${token}` });
    }
  } catch (e) {
    return res.status(400).json({ error: 'Password or email is incorrect' });
  }
});

module.exports = router;
