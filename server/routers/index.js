const express = require('express');
const router = express.Router();

const {userRouter} = require('../components/users/user');
const {authRouter} = require('../components/auth/auth');
router.use('/users',userRouter)
router.use('/auth',authRouter)

module.exports = { router };