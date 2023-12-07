const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mysql = require('../../database/dbWrapper');

module.exports = class authDAL{
    static async registerUser(newUser,hashedPassword) {
        return new Promise( async(resolve, reject) => {
            try {
                let connection = await mysql.getConnectionFromPool();
                connection = await mysql.beginTransaction(connection);
                const insertData = await mysql.createQuery({
                  query:`INSERT INTO users (username,password,email,first_name,last_name,auth_token) VALUES (?,?,?,?,?,?)`,
                  params:[newUser.username,newUser.password,newUser.email,newUser.FirstName,newUser.LastName,hashedPassword],
                  connection})
                return resolve({message:"Successfully Registered"})
                
            } catch(err) {
              console.log(err);
              return reject({error:err,message:"Already used this registration ID"})
            }
          })
    }

    static async isEmailTaken(userEmail) {
        return new Promise( async(resolve, reject) => {
            try {
                let connection = await mysql.getConnectionFromPool();
                connection = await mysql.beginTransaction(connection);
                return (await mysql.createQuery({
                    query:`SELECT * FROM users WHERE email = ?`,
                    params:[userEmail],
                    connection
                  }))
            } catch(err) {
              console.log(err);
              return reject(err)
            }
          })

    }
}