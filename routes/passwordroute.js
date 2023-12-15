const express = require('express');

const passController = require('../controllers/password');


const router = express.Router();



router.post('/forgotpassword', passController.forgotPassword);
router.get('/resetpassword/:id', passController.resetPassword);
router.post('/updatepassword',passController.updatePassword);

module.exports = router;