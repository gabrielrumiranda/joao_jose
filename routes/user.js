import express from 'express';
import UserController from '../controllers/user';
var router = express.Router();

router.post('/register', UserController.create);

module.exports = router;

