const express = require('express');

const expController = require('../controllers/expense');
const userAuth=require('../middleware/auth');

const router = express.Router();



router.post('/expense/add',userAuth.authenticate, expController.postExp);

router.get('/expense',userAuth.authenticate,expController.getAllExp);

router.get('/expense/delete/:id',userAuth.authenticate,expController.deleteExp);

module.exports = router;