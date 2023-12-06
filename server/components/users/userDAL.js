
const mysql = require('../../database/dbWrapper');

module.exports = class userDAL{
    static async insert(data) {
        return new Promise( async(resolve, reject) => {
            try {
                let connection = await mysql.getConnectionFromPool();
                connection = await mysql.beginTransaction(connection);
                console.log(parseInt(data.weight))
                return (await mysql.createQuery({
                    query:`INSERT INTO user_data (weight) VALUES (?)`,
                    params:[parseInt(data.weight)],
                    connection
                  }))
            } catch(err) {
              console.log(err);
              return reject(err)
            }
          })
    }
}