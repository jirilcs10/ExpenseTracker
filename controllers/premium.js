const Expense = require('../models/expenses');

const { QueryTypes } = require('sequelize');


exports.getLeaderBoard=async (req,res,next)=>{
    
    try{
        
        const data = await sequelize.query("SELECT * FROM ", { type: QueryTypes.SELECT });
        console.log(data);
        res.status(201).json({allExpense:data})
      }
      catch(err)
      {
        res.status(505).json({error:err});
      }
 }
 

 

 