const Expense = require('../models/expenses');

exports.postExp = async (req,res,next)=>{
  try{
  const amount = req.body.amount;
  const description = req.body.description;
  const category = req.body.category;
  console.log(amount);
  console.log(description);
  console.log(category);

  const data=await Expense.create({
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
        
        const data=await Expense.findAll();
        console.log(data);
        res.status(201).json({newExpense:data})
      }
      catch(err)
      {
        res.status(505).json({eror:err});
      }
 }
 

 exports.deleteExp=async (req,res,next)=>{

    try{
      const uid=req.params.id;
      await Expense.destroy({where:{id:uid}})
      console.log(uid);
      res.status(201).json("success");
    }
    catch(err)
    {
        res.status(505).json({error:err});
    }
}

 