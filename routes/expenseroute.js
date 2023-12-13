const express = require('express');

const expController = require('../controllers/expense');

const router = express.Router();



router.post('/expense/add', expController.postExp);

router.get('/expense',expController.getAllExp);

router.get('/expense/delete/:id',expController.deleteExp);

module.exports = router;