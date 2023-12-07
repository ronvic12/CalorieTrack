const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authDAL = require('./authDAL');
const { message } = require('antd');
module.exports = class authService{
    static async register(user_data) {
        return new Promise( async(resolve, reject) => {
            try {
                // Check if the email is already taken
                const hashedPassword = await bcrypt.hash(user_data.password, 12);
                let registeruserData = await authDAL.registerUser(user_data,hashedPassword)
               return resolve({message:registeruserData.message})
            } catch(err) {
              console.log(err);
              return reject({error:err,message:"Already used this registration ID"})
            }
          })
    }
}