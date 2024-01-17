const {sign,verify} = require("jsonwebtoken");
const config = require("./auth.config.js");
// store access token in a memory not in cookie or local storage
const createTokens = (user) => {
    const accessToken = sign({ username:user.username, email:user.email, id: user.id },config.secret,{
        expiresIn: config.jwtExpiration, // 24 hours
       });
    return accessToken;
}

const validateToken = (req, res, next) => {
    const accessToken = req.cookies["access-Token"] // double check this later.Because we don't want to probably store as cookies.Should be on memory

    if(!accessToken) 
        return res.status(400).json({error: "User not Authenticated"});

    try{
        const validToken = verify(accessToken,config.secret)
        console.log(validToken);
        if(validToken){
            req.authenticated = true;
            return next();
        }
    }catch(err){
        return res.status(400).json({error:err})
    }

};

module.exports = {createTokens,validateToken}