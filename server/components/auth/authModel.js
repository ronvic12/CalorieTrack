const {Sequelize} = require('sequelize')
const {db} = require('../../database/dbconnection.js');
const {DataTypes} = Sequelize;
const { v4: uuidv4 } = require("uuid");

const Users = db.define('users',{
    username:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    first_name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    last_name: {
        type:DataTypes.STRING,
        allowNull:false,
    },
    refresh_token:{
        type:DataTypes.TEXT
    }
},{
    freezeTableName:true
});

const RefreshToken = db.define("refreshToken", {
    token: {
      type: DataTypes.STRING,
    },
    expiryDate: {
      type: DataTypes.DATE,
    },
  });


(async () =>{
    await db.sync();
}) ();



module.exports = { Users,RefreshToken};