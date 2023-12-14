const Expense = require('../models/expenses');

const { QueryTypes } = require('sequelize');
const sequelize=require('../util/databases');

exports.getLeaderBoard=async (req,res,next)=>{
    
    try{
        
        const data = await sequelize.query("SELECT name,coalesce(sum(amount),0) as total FROM users left join expenses on users.id=expenses.userId group by users.id order by total desc ;", { type: QueryTypes.SELECT });
        console.log(data);
        res.status(201).json({allExpense:data})
      }
      catch(err)
      {
        console.log(err);
        res.status(520).json({error:err});
      }
 }
 

 

 