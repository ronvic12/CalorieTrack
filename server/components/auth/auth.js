const express = require('express');
const authRouter = express.Router();
const {checkDuplicateUsernameOrEmail} = require('./verifyRegister')
const {
    RegisterAuth,
    LoginAuth,
    User
  } = require('./authController');
  
  authRouter.post('/Register',checkDuplicateUsernameOrEmail,RegisterAuth)
  authRouter.post('/Login',LoginAuth)
  authRouter.get('/User',User)
module.exports = { authRouter };