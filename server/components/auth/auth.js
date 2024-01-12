const express = require('express');
const authRouter = express.Router();
const {checkDuplicateUsernameOrEmail} = require('./verifyRegister')
const {
    RegisterAuth
  } = require('./authController');
  
  authRouter.post('/Register',checkDuplicateUsernameOrEmail,RegisterAuth)

module.exports = { authRouter };