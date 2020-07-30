 
import bodyParser from 'body-parser';
import express from 'express';
import helmet from 'helmet';
import './env';

const session = require('express-session');
const server = express();
const port = process.env.PORT;
const passport = require('passport');
const flash = require('express-flash');
const path = require('path');

server.use(helmet());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
  extended: true
}));

server.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true
}));

if (server.get('env') === 'production') {
  // Serve secure cookies, requires HTTPS
  session.cookie.secure = true; 
}

server.use(passport.initialize());
server.use(passport.session());
server.use(flash());
server.use(express.static(path.join(__dirname, '..', '..', 'client')));

server.listen(port, function () {
  console.log('Listening on ' + port);
});

module.exports = server;