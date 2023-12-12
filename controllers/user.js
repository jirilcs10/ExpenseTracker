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

 exports.userLogin = async (req,res,next)=>{
  let data;
  try{
 
  const {email,password} = req.body;
  console.log(email);
  console.log(password);
  if(!email.length>0||!password.length>0)
  {
    throw new Error("Please enter the details");
  }

  data=await User.findOne({ where: { email:email } });
  if(data)
  {
      if(data.password===password)
      {
        return res.status(201).json("User Logged in Successfully");
      }
      else
      {
        return res.status(401).json("User Not Authorized");
      }
  }
  else
  {
    return res.status(404).json("User Not Found");
  }
  
}
catch(err)
{
    console.log(err);
    return res.status(801).json(err);
}
};

 