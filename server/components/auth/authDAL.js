const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mysql = require('../../database/dbWrapper');

module.exports = class authDAL{
    static async registerUser(data) {
        return new Promise( async(resolve, reject) => {
            try {
                let connection = await mysql.getConnectionFromPool();
                connection = await mysql.beginTransaction(connection);
                // Hash the password
                const hashedPassword = await bcrypt.hash(password, 12);
                const newUser = { email, password: hashedPassword };
                await mysql.createQuery({
                    query:`INSERT INTO users (weight) VALUES (?)`,
                    params:[parseInt(data.weight)],
                    connection})


                
            } catch(err) {
              console.log(err);
              return reject(err)
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