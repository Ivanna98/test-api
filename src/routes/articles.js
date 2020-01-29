const express = require('express');

const passport = require('passport');

const router = express.Router();
const ArticleCollection = require('../models/article');
const UserCollection = require('../models/user');

router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const {
      title,
      content,
      tags,
      category,
    } = req.body;
    const article = new ArticleCollection({
      author: req.user._id,
      title,
      content,
      tags,
      category,
    });
    const savedRecord = await article.save();
    return res.json(savedRecord);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.put('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const {
      title,
      content,
      tags,
      category,
    } = req.body;
    const { id } = req.params;
    const updateArticle = await ArticleCollection.findByIdAndUpdate(id, {
      author: req.user._id,
      title,
      content,
      tags,
      category,
    }, {
      new: true,
    });
    return res.json({ updateArticle });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const articles = await ArticleCollection.find();
    return res.json({ articles });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const oneArticle = await ArticleCollection
      .findById(id)
      .populate({ path: 'author', model: UserCollection, select: { _id: 1, name: 1, email: 1 } });
    if (oneArticle === null) return res.status(404).json({ message: 'Not found' });
    return res.json(oneArticle);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

router.delete('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const { id } = req.params;
    await ArticleCollection.findByIdAndDelete(id);
    return res.status(200).json({ message: 'Delete successful' });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

module.exports = router;
