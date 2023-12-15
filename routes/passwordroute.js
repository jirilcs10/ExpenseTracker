const express = require('express');

const passController = require('../controllers/password');
const userAuth=require('../middleware/auth');

const router = express.Router();



router.post('/forgotpassword', passController.forgotPassword);

module.exports = router;