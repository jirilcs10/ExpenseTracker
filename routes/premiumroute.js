const express = require('express');

const premController = require('../controllers/premium');
const userAuth=require('../middleware/auth');

const router = express.Router();



router.get('/leaderboard',userAuth.authenticate, premController.getLeaderBoard);


module.exports = router;