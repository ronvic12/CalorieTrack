// for now use Static Classes (Object Literals) for simplicity of the function.
// but if there is encapsulation, use Dynamic Classes (Constructor Functions/Class Syntax):
const userDAL = require('./userDAL');

module.exports = class userService{
    static async myFunc(data) {
        return new Promise( async(resolve, reject) => {
            try {
             let data1 = await userDAL.insert(data);
             return resolve({success: "Data Inserted ", transactquery: data1})
            } catch(err) {
              console.log(err);
              return reject(err)
            }
          })
    }
}
