const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    required: true,
    maxlength: 150,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    maxlength: 700,
    trim: true,
  },
  tags: [String],
  category: {
    type: String,
    default: 'anything',
    enum: ['something', 'else', 'js', 'node.js', 'category'],
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Article', ArticleSchema);
