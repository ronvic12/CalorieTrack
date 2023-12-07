const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authDAL = require('./authDAL');
module.exports = class authService{
    static async register(user_data) {
        return new Promise( async(resolve, reject) => {
            try {
                console.log(user_data)
                // Check if the email is already taken
                const emailTaken = await authDAL.isEmailTaken(user_data.email);
                if (emailTaken) {
                    const err = new Error('Email Taken!');
                    err.status = 400;
                    throw err;
                  }
            } catch(err) {
              console.log(err);
              return reject(err)
            }
          })
    }
}