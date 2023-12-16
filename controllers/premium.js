const User= require('../models/users');
const Expense=require('../models/expenses');
const S3service=require('../services/s3service');

exports.generateReport=async(req,res,next)=>{
  try{
  const expenses=await req.user.getExpenses();
  const filedata=JSON.stringify(expenses);
  const filename=`Expenses${req.user.id}/${new Date()}.txt`;
  const fileURL=await S3service.uploadToS3(filedata,filename);
  res.status(200).json({fileURL,success:true});
  }
  catch(err)
  {
    console.log(err);
    res.status(500).json({fileURL:'',success:false,error:err})
  }
}

exports.getLeaderBoard=async (req,res,next)=>{
    
    try{
        
        const data = await User.findAll({attributes:['name','totalexpense']});
        console.log(data);
        res.status(201).json({allExpense:data})
      }
      catch(err)
      {
        console.log(err);
        res.status(520).json({error:err});
      }
 }
 

 

 