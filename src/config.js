const dotenv = require('dotenv');

dotenv.config();

const config = {
  db: {
    url: process.env.DB_URL || '',
    test_url: process.env.TEST_DB_URL || '',
  },
  secretKey: process.env.SECRET,
  jwtExpiration: 259200,
};

module.exports = config;
