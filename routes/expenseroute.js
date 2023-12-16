const express = require('express');

const expController = require('../controllers/expense');
const userAuth=require('../middleware/auth');

const router = express.Router();



router.post('/addexpense',userAuth.authenticate, expController.postExp);

router.get('/',userAuth.authenticate,expController.getAllExp);

router.get('/deleteexpense/:id',userAuth.authenticate,expController.deleteExp);

module.exports = router;