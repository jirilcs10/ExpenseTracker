const express = require('express');
const cors=require('cors');
const bodyParser = require('body-parser');

const sequelize=require('./util/databases');
const app = express();
app.use(cors());

const Expense = require('./models/expenses');
const User=require('./models/users');
const Order=require('./models/orders')

const userRoutes = require('./routes/userroute');
const expenseRoutes = require('./routes/expenseroute');
const purchaseRoutes=require('./routes/purchaseroute');
const leaderRoutes=require('./routes/premiumroute');
const passwordRoutes=require('./routes/passwordroute');

app.use(bodyParser.json({ extended: false }));
  
Expense.belongsTo(User,{constraints:true,onDelete:'CASCADE'});
User.hasMany(Expense);

Order.belongsTo(User);
User.hasMany(Order);

app.use(userRoutes);
app.use("/expense",expenseRoutes);
app.use("/purchase",purchaseRoutes);
app.use("/password",passwordRoutes);
app.use(leaderRoutes);

sequelize.sync().then(result=>{
    app.listen(3000);
}).catch(err=>console.log(err));
