const Expense = require('../models/expenses');

const { QueryTypes } = require('sequelize');
const sequelize=require('../util/databases');

exports.getLeaderBoard=async (req,res,next)=>{
    
    try{
        
        const data = await req.user.get({attributes:('name','totalexpense')});
        console.log(data);
        res.status(201).json({allExpense:data})
      }
      catch(err)
      {
        console.log(err);
        res.status(520).json({error:err});
      }
 }
 

 

 