const {Sequelize} = require('sequelize')
const {db} = require('../../database/dbconnection.js');

const {DataTypes} = Sequelize;

const Users = db.define('users',{
    username:{
        type:DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING
    },
    password:{
        type:DataTypes.STRING
    },
    first_name:{
        type:DataTypes.STRING
    },
    last_name: {
        type:DataTypes.STRING
    },
    refresh_token:{
        type:DataTypes.TEXT
    }
},{
    freezeTableName:true
});
(async () =>{
    await db.sync();
}) ();


module.exports = { Users };