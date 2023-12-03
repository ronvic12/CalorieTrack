const express = require('express');
const userRouter = express.Router();

const {
   userAuth
  } = require('./userController');
  
  userRouter.post('/usersAuth',userAuth)

module.exports = { userRouter };