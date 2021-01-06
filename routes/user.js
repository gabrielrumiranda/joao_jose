import express from 'express';
import UserController from '../controllers/user';

const passport = require('passport');
var router = express.Router();

router.post('/signup', UserController.signup);
router.post('/signin', UserController.signin);
router.get(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      email: req.user.email
    });
  }
);

module.exports = router;

