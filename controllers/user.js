import { User } from '../models';
const UserService = require('../services/user.js');
const jsonwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.signup = async(req, res) => {
  try {
    const result = await UserService.create(req.body);
    if (result.success) {
      res.status(201).json(result);
    }
    else {
      res.status(400).json(result);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.signin = async (req, res) => {
  const {email, password } = req.body; 

  await User.findOne({ where: { email: email } })
    .then(function (user) {
      if (!user) {
        res.status(404).send('User not exist');
      } else if (!user.validPassword(password)) {
        res.status(401).send('User Unauthorized Access');
      } else {
        const payload = {
          id: user.id,
          email: user.email
        };
        jsonwt.sign(
          payload,
          process.env.SECRET_KEY,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) {
              console.log('Error is ', err.message);
            }
            res.json({
              success: true,
              token: token
            });
          }
        );
      }
    });
};
