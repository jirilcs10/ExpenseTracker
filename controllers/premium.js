const sequelize=require('../util/databases');
const User= require('../models/users');
const Expense=require('../models/expenses');
const Download=require('../models/downloads');
const S3service=require('../services/s3service');

exports.generateReport=async(req,res,next)=>{
  try{
  const expenses=await req.user.getExpenses();
  const filedata=JSON.stringify(expenses);
  const filename=`Expenses${req.user.id}/${new Date()}.txt`;
  const fileURL=await S3service.uploadToS3(filedata,filename);
  await req.user.createDownload({downloadURL:fileURL});
  res.status(200).json({fileURL,success:true});
  }
  catch(err)
  {
    console.log(err);
    res.status(500).json({fileURL:'',success:false,error:err})
  }
}
exports.downloadHistory=async(req,res,next)=>{
  const data=await Download.findAll({attributes: {
    include: [
      [
        sequelize.fn
        (
          "DATE_FORMAT", 
          sequelize.col("createdAt"), 
          "%d-%m-%Y"
        ),
        "createdAt",
      ],
      "downloadURL",
    ],
  },
});

res.status(201).json({history:data});
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
 

 

 