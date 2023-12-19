const jwt=require('jsonwebtoken')

exports.generateAccessToken=function (id,ispremium)
{
  return jwt.sign({userId:id,isPremiumUser:ispremium},process.env.SECURE_STRING);
}