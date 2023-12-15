const Sib=require('sib-api-v3-sdk');
const client=Sib.ApiClient.instance;
client.authentications['api-key'].apiKey=process.env.SMTPAPIKEY;
const transactionEmailApi=new Sib.TransactionalEmailsApi();
const User=require('../models/users');
const Requestpassword=require('../models/requestpassword');
const path=require('path');
const bcrypt=require('bcrypt');

exports.forgotPassword=async(req,res,next)=>{
try{

const mail=req.body.email;
const user=await User.findOne({where :{email:mail}})

if(user)
{
const sender={email:'jirilcs10@gmail.com'}
const receivers=[{email:mail}];
console.log(user);
const reset= await user.createRequestpassword({});
const id = reset.id;
console.log(id);
await transactionEmailApi.sendTransacEmail({
    sender,
    to: receivers,
    subject:"Reset Password",
    textContent:`Password reset link`,
    htmlContent:`<!DOCTYPE html>
    <html>
    <style>
       a::after {
        content:  attr(href);
        }
    </style>
    <body>
        <a href="http://localhost:3000/password/resetpassword/{{params.uuid}}">http://localhost:3000/password/resetpassword/{{params.uuid}}</a>
    </body>
    </html>`,params:{
        uuid:id
    }
   })
  }
  }
   catch(err)
   {
    console.log(err);
   }
}
exports.resetPassword=async(req,res,next)=>{
    const uuid=req.params.id;
    console.log(uuid);
    const request=await Requestpassword.findByPk(uuid);
    console.log(request);
    if (request.isactive) {
        request.isactive = false;
        await request.save();
        console.log(__dirname);
        res.sendFile('reset.html',{root:'views'});
    } 
    else {
         res.status(401).json({ message: "Password reset link expired" })
         res.redirect('/login');
    }
}
exports.updatePassword=async(req,res,next)=>{
try{
    const {uuid,password}=req.body;
    const hash=await bcrypt.hash(password,10);
    const reset = await Requestpassword.findByPk(uuid);
    await User.update({password: hash},{where: { id: reset.userId }});
    res.status(200).json({ message:"Success"});
    res.redirect('/login');
}

catch(err) 
{
   console.log(err);
   res.status(505).json({ message:"Something went wrong"});
}
}