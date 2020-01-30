const express = require('express');

const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const logger = require('morgan');
const swaggerUi = require('swagger-ui-express');
const connectPassport = require('./middleware/passport');
const config = require('./config');
const articles = require('./routes/articles');
const signup = require('./routes/signup');
const login = require('./routes/login');
const documentation = require('../api-documentation.json');

const PORT = process.env.PORT || 3002;
const DB_URL = config.db.url;

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
connectPassport(passport);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(documentation));
app.use('/articles', articles);
app.use('/signup', signup);
app.use('/login', login);
app.get('/ready', (req, res) => {
  res.send('I`m alive');
});

mongoose.connect(DB_URL, { useNewUrlParser: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((error) => console.log(error.massage));

mongoose.connection.on('error', (err) => {
  console.log(err);
});


module.exports = app;
