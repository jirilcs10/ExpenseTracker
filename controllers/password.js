const Sib=require('sib-api-v3-sdk');
const client=Sib.ApiClient.instance;
client.authentications['api-key'].apiKey=process.env.SMTPAPIKEY;
const transactionEmailApi=new Sib.TransactionalEmailsApi();
exports.forgotPassword=async(req,res,next)=>{
try{
const sender={
    email:'jirilcs10@gmail.com'
}
const mail=req.body.email;
console.log(mail)
const receivers=[
    {
    email:mail
}
]
console.log(122222);
console.log(receivers);
console.log(sender);
await transactionEmailApi.sendTransacEmail({
    sender,
    to: receivers,
    subject:"Reset Password",
    textContent:`Password reset link`,
})

}
catch(err)
{
    console.log(err);
}
}