const express = require('express');

const router = express.Router();
const ArticleCollection = require('../models/article');

router.post('/', async (req, res) => {
  try {
    const {
      author,
      title,
      content,
      tags,
      category,
    } = req.body;
    console.log(typeof tags);
    const article = new ArticleCollection({
      author,
      title,
      content,
      tags,
      category,
    });
    const savedRecord = await article.save();
    return res.json(savedRecord);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
});

router.put('/', async (req, res) => {
  try {
    const {
      author,
      title,
      content,
      tags,
      category,
    } = req.body;
    const { id } = req.params;
    const updateArticle = await ArticleCollection.findByIdAndUpdate(id, {
      author,
      title,
      content,
      tags,
      category,
    }, {
      new: true,
    });
    return res.json(updateArticle);
  } catch (e) {
    return res.status(400).end();
  }
});

router.get('/', async (req, res) => {
  try {
    const articles = await ArticleCollection.find();
    return res.json(articles);
  } catch (e) {
    return res.status(400).end();
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const oneArticle = await ArticleCollection.findById(id);
    return res.json(oneArticle);
  } catch (e) {
    return res.status(400).end();
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await ArticleCollection.findByIdAndDelete(id);
    return res.status(200).end();
  } catch (e) {
    return res.status(400).end();
  }
});

module.exports = router;
