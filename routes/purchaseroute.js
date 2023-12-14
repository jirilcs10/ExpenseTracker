const express = require('express');

const purchaseController=require('../controllers/purchase')
const userAuth=require('../middleware/auth');

const router = express.Router();



router.get('/buypremium',userAuth.authenticate, purchaseController.buyPremium);
router.post('/updatetransactionstatus',userAuth.authenticate, purchaseController.updateTransactionStatus);



module.exports = router;