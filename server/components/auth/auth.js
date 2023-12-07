const express = require('express');
const authRouter = express.Router();

const {
    RegisterAuth
  } = require('./authController');
  
  authRouter.post('/RegisterAuth',RegisterAuth)

module.exports = { authRouter };