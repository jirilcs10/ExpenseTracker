const express = require('express');
const cors=require('cors');
const bodyParser = require('body-parser');
const path=require('path');
const fs=require('fs');
const sequelize=require('./util/databases');
const app = express();
const helmet=require('helmet');
const morgan=require('morgan');

const Expense = require('./models/expenses');
const User=require('./models/users');
const Order=require('./models/orders');
const ResetPassword=require('./models/requestpassword');
const Download=require('./models/downloads');

const userRoutes = require('./routes/userroute');
const expenseRoutes = require('./routes/expenseroute');
const purchaseRoutes=require('./routes/purchaseroute');
const premiumRoutes=require('./routes/premiumroute');
const passwordRoutes=require('./routes/passwordroute');

const logStream=fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'});

app.use(cors());
app.use(helmet());
app.use(morgan('combined',{stream:logStream}));
app.use(bodyParser.json({ extended: false }));
  
Expense.belongsTo(User,{constraints:true,onDelete:'CASCADE'});
User.hasMany(Expense);

Order.belongsTo(User);
User.hasMany(Order);

User.hasMany(ResetPassword);
ResetPassword.belongsTo(User,{constraints:true,onDelete:'CASCADE'});

Download.belongsTo(User,{constraints:true,onDelete:'CASCADE'});
User.hasMany(Download);



app.get('/public/js/signup.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/js/signup.js'));
});
app.use('/signup',(req,res)=>{
    res.sendFile('signup.html', { root: 'views' })
});
app.get('/public/js/login.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/js/login.js'));
});
app.use('/login',(req,res)=>{
    res.sendFile('login.html', { root: 'views' })
});
app.get('/public/js/exp.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/js/exp.js'));
});
app.use('/features',(req,res)=>{
    res.sendFile('features.html', { root: 'views' })
});
app.get('/public/js/pass.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/js/pass.js'));
});
app.use('/forgotpassword',(req,res)=>{
    res.sendFile('password.html', { root: 'views' });
});
app.get('/public/js/reset.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/js/reset.js'));
});

app.use(userRoutes);
app.use("/user",expenseRoutes);
app.use("/purchase",purchaseRoutes);
app.use("/password",passwordRoutes);
app.use("/user",premiumRoutes);

sequelize.sync().then(result=>{
    app.listen(process.env.PORT||3000);
}).catch(err=>console.log(err));
