const Expense = require('../models/expenses');

exports.postExp = async (req,res,next)=>{
  try{
  const amount = req.body.amount;
  const description = req.body.description;
  const category = req.body.category;
  console.log(amount);
  console.log(description);
  console.log(category);

  const data=await req.user.createExpense({
    amount:amount,
    description:description,
    category:category
  });
  res.status(201).json({newExpense:data});
}
catch(err)
{
    res.status(505).json({error:err});
}
};

exports.getAllExp=async (req,res,next)=>{
    
    try{
        
        const data=await Expense.findAll({where:{userId:req.user.id}});
        console.log(data);
        res.status(201).json({newExpense:data})
      }
      catch(err)
      {
        res.status(505).json({error:err});
      }
 }
 

 exports.deleteExp=async (req,res,next)=>{

    try{
      const uid=req.params.id;
      const user=await req.user.getExpenses({where:{id:uid}});
      console.log(1121);
      console.log(user);
      await user[0].destroy()
      console.log(uid);
      res.status(201).json("success");
    }
    catch(err)
    {
        res.status(505).json({error:err});
    }
}

 