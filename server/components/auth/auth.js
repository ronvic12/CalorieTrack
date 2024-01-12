const express = require('express');
const authRouter = express.Router();
const {checkDuplicateUsernameOrEmail} = require('./verifyRegister')
const {
    RegisterAuth,
    LoginAuth
  } = require('./authController');
  
  authRouter.post('/Register',checkDuplicateUsernameOrEmail,RegisterAuth)
  authRouter.post('/Login',LoginAuth)

module.exports = { authRouter };