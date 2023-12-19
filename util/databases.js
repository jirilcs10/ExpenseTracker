const Sequelize=require('sequelize');

const sequelize=new Sequelize(process.env.DATABASE,process.env.DATABASE_ACCESS,process.env.DATABASE_PASSWORD,{
    dialect:process.env.DATABASE_DIALECT,
    host:process.env.DATABASE_HOST
});


module.exports = sequelize;