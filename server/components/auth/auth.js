const express = require('express');
const authRouter = express.Router();
const {checkDuplicateUsernameOrEmail} = require('./verifyRegister')
const {RegisterAuth,LoginAuth,User,refreshToken,Profile} = require('./authController');
const {validateToken} = require('./JWT')


authRouter.post('/Register',checkDuplicateUsernameOrEmail,RegisterAuth);
authRouter.post('/Login',LoginAuth);
authRouter.post('/profile',validateToken,Profile);
// authRouter.post('/api/auth/Login',LoginAuth);
// authRouter.get('/api/auth/Profile',Profile);
// authRouter.post("/api/auth/refreshtoken", refreshToken);
// authRouter.post('/api/auth/User',User);

module.exports = {authRouter}
 




// app.use(function(req, res, next) {
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, Content-Type, Accept"
//   );
//   next();
// });
