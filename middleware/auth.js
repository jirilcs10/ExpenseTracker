const User = require('../models/users');
const jwt=require('jsonwebtoken');

exports.authenticate=async(req,res,next)=>{
    try{
    const token=req.header('Authorization');
    console.log(token);
    const user=jwt.verify(token,process.env.SECURE_STRING);
    console.log(user);
    const data=await User.findByPk(user.userId);
    console.log(data);
    req.user=data;
    next();
    }
    catch(err)
    {
        console.log(err);
        res.status(505).json(err);
    }
}