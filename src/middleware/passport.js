const { Strategy, ExtractJwt } = require('passport-jwt');

const config = require('../config');
const User = require('../models/user');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secretKey,
};

const connectPassport = (passport) => {
  passport.use(
    new Strategy(options, (payload, done) => {
      User.findById(payload.id)
        .then((user) => {
          if (user) {
            return done(null, {
              _id: user._id,
              name: user.name,
              email: user.email,
            });
          }
          return done(null, false);
        }).catch(() => done(null, false));
    }),
  );
};

module.exports = connectPassport;
