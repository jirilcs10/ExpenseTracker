const express = require('express');
const cors=require('cors');
const bodyParser = require('body-parser');
const path=require('path');
const sequelize=require('./util/databases');
const app = express();
app.use(cors());

const Expense = require('./models/expenses');
const User=require('./models/users');
const Order=require('./models/orders');
const ResetPassword=require('./models/requestpassword');

const userRoutes = require('./routes/userroute');
const expenseRoutes = require('./routes/expenseroute');
const purchaseRoutes=require('./routes/purchaseroute');
const premiumRoutes=require('./routes/premiumroute');
const passwordRoutes=require('./routes/passwordroute');

app.use(bodyParser.json({ extended: false }));
  
Expense.belongsTo(User,{constraints:true,onDelete:'CASCADE'});
User.hasMany(Expense);

Order.belongsTo(User);
User.hasMany(Order);

User.hasMany(ResetPassword);
ResetPassword.belongsTo(User,{constraints:true,onDelete:'CASCADE'});
app.get('/public/src/signup.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/src/signup.js'));
});
app.use('/signup',(req,res)=>{
    res.sendFile('signup.html', { root: 'views' })
});
app.get('/public/src/login.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/src/login.js'));
});
app.use('/login',(req,res)=>{
    res.sendFile('login.html', { root: 'views' })
});
app.get('/public/src/exp.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/src/exp.js'));
});
app.use('/features',(req,res)=>{
    res.sendFile('features.html', { root: 'views' })
});
app.get('/public/src/pass.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/src/pass.js'));
});
app.use('/forgotpassword',(req,res)=>{
    res.sendFile('password.html', { root: 'views' });
});
app.get('/public/src/reset.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/src/reset.js'));
});

app.use(userRoutes);
app.use("/user",expenseRoutes);
app.use("/purchase",purchaseRoutes);
app.use("/password",passwordRoutes);
app.use("/user",premiumRoutes);

sequelize.sync().then(result=>{
    app.listen(3000);
}).catch(err=>console.log(err));
