const User = require('../models/users');

exports.signUp = async (req,res,next)=>{
  try{
  const name = req.body.name;
  const email= req.body.email;
  const password= req.body.password;

  const data=await User.create({
    name:name,
    email:email,
    password:password
  });
  res.status(201).json({newUser:data})
}
catch(err)
{
    if(err.name==="SequelizeUniqueConstraintError")
    res.status(840).json(err);
    else
    res.status(505).json(err);
}
 };

 