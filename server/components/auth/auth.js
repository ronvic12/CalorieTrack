// const express = require('express');
// const authRouter = express.Router();
const {checkDuplicateUsernameOrEmail} = require('./verifyRegister')
const {RegisterAuth,LoginAuth,User,refreshToken} = require('./authController');


module.exports =function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });


  app.post('/api/auth/Register',checkDuplicateUsernameOrEmail,RegisterAuth)
  app.post('/api/auth/Login',LoginAuth)
  app.post("/api/auth/refreshtoken", refreshToken);
  app.post('/api/auth/User',User);

}
 


