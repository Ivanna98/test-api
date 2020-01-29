const express = require('express');

const router = express.Router();
const bcrypt = require('bcryptjs');
const UserCollection = require('../models/user');
const generateToken = require('../utils/generateToken');

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
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newUser.password, salt);
    newUser.password = hash;
    await newUser.save();
    const payload = {
      id: newUser._id,
      name,
    };
    const token = await generateToken(payload);
    return res.json({ token: `Bearer ${token}` });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;
