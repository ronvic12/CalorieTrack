const express = require('express');
const router = express.Router();

const {userRouter} = require('../components/users/user');
router.use('/users',userRouter)


module.exports = { router };