const Sequelize=require('sequelize');

const sequelize=new Sequelize('expense','root','sqlismysql',{
    dialect:'mysql',
    host:'localhost'
});


module.exports = sequelize;