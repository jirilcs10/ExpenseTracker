const Sequelize=require('sequelize');
const sequelize=require('../util/databases');

const Download=sequelize.define('download',{
  id:{
   type:Sequelize.INTEGER,
   autoIncrement:true,
   allowNull:false,
   primaryKey:true
  },
  downloadURL:Sequelize.STRING,
});

module.exports=Download;