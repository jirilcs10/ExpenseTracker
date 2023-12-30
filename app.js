const express = require('express');
const cors=require('cors');
const app = express();
const dotenv=require('dotenv');
dotenv.config();

const bodyParser = require('body-parser');
const path=require('path');
const fs=require('fs');
const sequelize=require('./util/databases');

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
let errorobj;
app.use(cors());
app.use(helmet({
    contentSecurityPolicy: {
         useDefaults: true,
        directives: {
            "script-src": ["'self'", "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js","https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.0/axios.min.js","https://checkout.razorpay.com/v1/checkout.js",'https://api.razorpay.com/*','*.razorpay.com/*'],
             "frame-src":["'self'","https://api.razorpay.com",'*.razorpay.com/*'],
             'connect-src':["'self'",'https://api.razorpay.com','*.razorpay.com'],
             }
            },
            
            
      }));


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

app.use(express.static('public'));


// app.get('/public/js/signup.js', function(req, res) {
//     res.sendFile(path.join(__dirname + '/public/js/signup.js'));
// });
app.use('/signup',(req,res)=>{
    res.sendFile('signup.html', { root: 'views' })
});
// app.get('/public/js/login.js', function(req, res) {
//     res.sendFile(path.join(__dirname + '/public/js/login.js'));
// });
app.use('/login',(req,res)=>{
    res.sendFile('login.html', { root: 'views' })
});
// app.get('/public/js/exp.js', function(req, res) {
//     res.sendFile(path.join(__dirname + '/public/js/exp.js'));
// });
app.use('/features',(req,res)=>{
    res.sendFile('features.html', { root: 'views' })
});
// app.get('/public/js/pass.js', function(req, res) {
//     res.sendFile(path.join(__dirname + '/public/js/pass.js'));
// });
app.use('/forgotpassword',(req,res)=>{
    res.sendFile('password.html', { root: 'views' });
 });
// app.get('/public/js/reset.js', function(req, res) {
//     res.sendFile(path.join(__dirname + '/public/js/reset.js'));
// });
app.use('/csperror',(req,res,next)=>{
    console.log(req);
})
app.use(userRoutes);
app.use("/user",expenseRoutes);
app.use("/purchase",purchaseRoutes);
app.use("/password",passwordRoutes);
app.use("/user",premiumRoutes);

console.log(errorobj);
sequelize.sync().then(result=>{
    app.listen(process.env.PORT||3000);
}).catch(err=>console.log(err));
