const express = require('express');

const premController = require('../controllers/premium');
const userAuth=require('../middleware/auth');

const router = express.Router();



router.get('/leaderboard',userAuth.authenticate, premController.getLeaderBoard);
router.get('/report',userAuth.authenticate, premController.generateReport);
router.get('/reporthistory',userAuth.authenticate, premController.downloadHistory);

module.exports = router;