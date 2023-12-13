const express = require('express');
const cors=require('cors');
const bodyParser = require('body-parser');

const sequelize=require('./util/databases');
const app = express();
app.use(cors());

const userRoutes = require('./routes/userroute');
const expenseRoutes = require('./routes/expenseroute');
const Expense = require('./models/expenses');
const User=require('./models/users');
app.use(bodyParser.json({ extended: false }));
  
Expense.belongsTo(User,{constraints:true,onDelete:'CASCADE'});
User.hasMany(Expense);

app.use(userRoutes);
app.use(expenseRoutes);

sequelize.sync().then(result=>{
    app.listen(3000);
}).catch(err=>console.log(err));
