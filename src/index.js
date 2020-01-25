const express = require('express');

const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');
const logger = require('./middleware/logger');
const articles = require('./routes/articles');

const PORT = process.env.PORT || 3002;

mongoose.connect(config.db.url, { useNewUrlParser: true })
  .catch((error) => console.log(error.massage));
mongoose.connection.on('error', (err) => {
  console.log(err);
});

app.use(cors());
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/articles', articles);

app.get('/ready', (req, res) => {
  res.send('I`m alive');
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
