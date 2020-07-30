const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const init = require('./passport');
import {getUserByName} from '../queries/user';
import {comparePass} from '../auth/authHelpers';

const options = {
  usernameField: 'name',
  passwordField: 'password'
};

init();

passport.use(new LocalStrategy(options, (name, password, done) => {
  getUserByName(name)
    .then((user) => {
      user = user.rows[0];
      if (!user) {return done(null, false);}
      console.log(password);
      console.log(user.password);
      if (!comparePass(password, user.password)) {
        return (done, false);
      } else {
        console.log('foi');
        return (done, user);
      }
    })
    .catch((err) => {return done(err);});
}));

module.exports = passport;