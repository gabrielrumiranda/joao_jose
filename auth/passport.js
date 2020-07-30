const passport = require('passport');
import {getUserById} from '../queries/user';

module.exports = () => {

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    getUserById(id)
      .then((user) => { done(null, user[0]); })
      .catch((err) => { done(err, null); });
  });
};