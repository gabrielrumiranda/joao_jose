const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const init = require('./passport');
import {getUserByName} from '../queries/user';
import {comparePass} from '../auth/authHelpers';
const options = {};

init();

passport.user(new LocalStrategy(options, (username, password, done) => {
  getUserByName(username)
    .then((user) => {
      if (!user) {return done(null, false);}
      if (!comparePass(password, user.password)) {
        return (done, false);
      } else {
        return (done, user);
      }
    })
    .catch((err) => {return done(err);});
}));

module.exports = passport;