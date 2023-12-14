const Razorpay=require('razorpay');
const Order=require('../models/orders');
const accessToken=require('../util/accesstoken');

const buyPremium=async(req,res)=>{
    try{
        var rzp=new Razorpay({
            key_id:process.env.RAZORPAYKEYID,
            key_secret:process.env.RAZORPAYKEYSECRET
        })
        const amount=2500;
        rzp.orders.create({amount,currency:"INR"},async (err,order)=>{
            if(err)
            throw new Error(JSON.stringify(err));
         await req.user.createOrder({orderid:order.id,status:'PENDING'});
         return res.status(201).json({order,key_id:rzp.key_id})
        })
    }
    catch(err)
    {
     console.log(err);
     res.status(403).json({error:err});
    }
}

const updateTransactionStatus=async(req,res)=>{
    try{
        
        console.log(req.query.success);
        if(req.query.success=="true")
        {
        const {paymentId,orderId}=req.body;
        console.log(paymentId);
        const order=await Order.findOne({where:{orderid:orderId}})
        await Promise.all([order.update({paymentid:paymentId,status:'SUCCESSFUL'}),req.user.update({ispremiumuser:true})]);
        const data=await req.user.get();
        console.log(data);
        return res.status(202).json({success:true,message:'Transaction successfull',token:accessToken.generateAccessToken(data.id,data.ispremiumuser)});
        }
        else
        {
            const {orderId}=req.body;
            const order=await Order.findOne({where:{orderid:orderId}})
            await Promise.all([order.update({status:'Failed'}),req.user.update({ispremiumuser:false})]);
            return res.status(202).json({success:false,message:'Transaction Failed'});
        
        }
    }
catch(err)
{
    res.status(511).json({error:err});
}
}

module.exports={
    buyPremium,updateTransactionStatus
}