const express = require('express');
const authRouter = express.Router();

const {
    RegisterAuth
  } = require('./authController');
  
  authRouter.post('/Register',RegisterAuth)

module.exports = { authRouter };