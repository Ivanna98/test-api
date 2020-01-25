const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  tags: [
    {
      tag: String,
    },
  ],
  category: {
    type: String,
    default: 'anything',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Article', ArticleSchema);
