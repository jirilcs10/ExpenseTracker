const User = require('../models/users');
const bcrypt=require('bcrypt');
exports.signUp = async (req,res,next)=>{
  try{
  const name = req.body.name;
  const email= req.body.email;
  const password= req.body.password;
  const hash=await bcrypt.hash(password,10)
  const data=await User.create({
    name:name,
    email:email,
    password:hash
  });
  res.status(201).json({message:"New user created successfully"});
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
    throw new Error("Please enter the email and password");
  }

  data=await User.findOne({ where: { email:email } });
  if(data)
  {
      bcrypt.compare(password,data.password,(error,result)=>{
        if(error)
        throw new Error("Something went wrong");
        if(result===true)
        return res.status(201).json("User Logged in Successfully");
        else
        return res.status(401).json("Password does not match");
      });
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

 