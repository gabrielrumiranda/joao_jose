import { User } from '../models';
const jsonwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.signup = async(req, res) => {
  await User.findOne({ where: { email: req.body.email } })
    .then(async function (user) {
      if (!user) {
        await User.create({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        })
          .then(user => {
            res.status(200).send(user);
          })
          .catch(err => {
            res.status(400).send(err.message);
          });
      } else {
        res.status(409).send('User already exists');
      }
    })
    .catch(err => {
      console.log('Error is ', err.message);
    });
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
