const {Sequelize} = require('sequelize')
require('dotenv').config();

const db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect:"mysql",
        pool: {
            max: 15,// 15 max connections per instance, might change this later
            min: 0,
            acquire: 30000, // number of wait time in millisecond
            idle: 10000
        }
    })

module.exports = {db};