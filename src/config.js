const dotenv = require('dotenv');

dotenv.config();

const config = {
  db: {
    url: process.env.DB_URL || '',
  },
  secretKey: process.env.SECRET,
  jwtExpiration: 259200,
};

module.exports = config;
