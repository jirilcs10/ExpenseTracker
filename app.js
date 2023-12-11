const express = require('express');
const cors=require('cors');
const bodyParser = require('body-parser');

const sequelize=require('./util/databases');
const app = express();
app.use(cors());

const userRoutes = require('./routes/userroute');
app.use(bodyParser.json({ extended: false }));
  

app.use(userRoutes);

sequelize.sync().then(result=>{
    app.listen(3000);
}).catch(err=>console.log(err));
