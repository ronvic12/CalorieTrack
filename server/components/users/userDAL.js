
const mysql = require('../../database/dbWrapper');

module.exports = class userDAL{
    static async insert(data) {
        return new Promise( async(resolve, reject) => {
            try {
              console.log("Weight",data.weight);
            } catch(err) {
              console.log(err);
              return reject(err)
            }
          })
    }
}