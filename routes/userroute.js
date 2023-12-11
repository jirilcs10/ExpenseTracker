const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.post('/user/signup', userController.signUp);


module.exports = router;