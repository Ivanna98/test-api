const express = require('express');

const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const connectPassport = require('./middleware/passport');
const config = require('./config');
const logger = require('./middleware/logger');
const articles = require('./routes/articles');
const signup = require('./routes/signup');
const login = require('./routes/login');

const PORT = process.env.PORT || 3002;
const DB_URL = process.env.NODE_ENV === 'test'
  ? config.db.test_url : config.db.url;

mongoose.connect(DB_URL, { useNewUrlParser: true })
  .catch((error) => console.log(error.massage));
mongoose.connection.on('error', (err) => {
  console.log(err);
});

app.use(cors());
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
connectPassport(passport);

app.use('/articles', articles);
app.use('/signup', signup);
app.use('/login', login);
app.get('/ready', (req, res) => {
  res.send('I`m alive');
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;