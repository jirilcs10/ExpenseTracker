const Expense = require('../models/expenses');
const sequelize = require('../util/databases');





exports.postExp = async (req,res,next)=>{
  
  try{
    var t= await sequelize.transaction();
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
  },{transaction:t});
  console.log(data.amount);
  console.log(req.user.totalexpense);
  const value=parseFloat(req.user.totalexpense)+parseFloat(data.amount);
  console.log(value);
  await req.user.update({
    totalexpense:value
  },{transaction:t})
  await t.commit();
  res.status(201).json({newExpense:data});
}
catch(err)
{   
    await t.rollback();
    console.log(err);
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
      await sequelize.transaction(async(t)=>{
        const uid=req.params.id;
        const user=await req.user.getExpenses({where:{id:uid},transaction:t});
        const value=parseFloat(req.user.totalexpense)-parseFloat(user[0].amount);
        await user[0].destroy({transaction:t})
        console.log(value);
        await req.user.update({
          totalexpense:value
        },{transaction:t})
      });
      res.status(201).json("success");
    }
    catch(err)
    {   
        res.status(505).json({error:err});
    }
}

 