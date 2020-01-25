const moment = require('moment');

const logger = (req, res, next) => {
  console.log(`${req.method}:${req.path} ${moment().format()}`);
  next();
};
module.exports = logger;
