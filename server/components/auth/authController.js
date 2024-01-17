const {Users} = require('./authModel')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken') // it has to become a var not const so it can access all jswon webtoken files
const { Op } = require('sequelize');
const config = require("./auth.config.js");
const {RefreshTokenModel} = require("./refreshTokenModel");



module.exports.RegisterAuth = async(req, res, next) => {
    const data = {
        email:req.body.email,
        FirstName:req.body.FirstName,
        LastName: req.body.LastName,
        username: req.body.username,
        password: req.body.password,
        confirmpassword: req.body.confirmpassword
    }

    if(data.password !== data.confirmpassword) return res.status(400).json({msg:'Password and Confirm Password does not match'});
    // const salt = await bcrypt.genSalt();
    console.log(data);
    const hashpassword = await bcrypt.hash(data.password,10);
    console.log(hashpassword)
    try{  
        await Users.create({
            username:data.username,
            email:data.email,
            password:hashpassword,
            first_name:data.FirstName,
            last_name:data.LastName
        })
     res.status(200).json({msg:"Registered Succefully"})
    }catch(err){
        res.status(400).send('Already used this registration ID');
    }
  

}

module.exports.LoginAuth = async(req,res,next) =>{

    const data = {
        emailOrUsername:req.body.emailOrUsername,
        password: req.body.password
    }
    try{
    const user = await Users.findOne({
        where: {
            [Op.or]: [
              { username: data.emailOrUsername },
              { email: data.emailOrUsername },
            ],
         },
        });

        if (!user) {
            return res.status(404).send({ message: "User Not found." });
          }

        const passwordIsValid = bcrypt.compareSync(data.password,user.password);
        if (!passwordIsValid) {
        return res.status(401).send({
            accessToken:null,
            message: "Invalid Password!",
        });
    }

        const token = jwt.sign({ id: user.id },config.secret,{
             expiresIn: config.jwtExpiration, // 24 hours
            });

       // let refreshToken = await RefreshTokenModel.createToken(user);
       //refreshToken: refreshToken
        req.session.token = token;
        res.status(200).send({
            msg:"Login Succefully",
            id:user.id,
            username:user.email,
            accessToken: token,
            
        })
    }catch(err){
        console.log(err)
        res.status(500).send('Error');
    }
  
}

module.exports.User = async(req,res,next) =>{
    try{
    const users = await Users.findOne({
        where: {
          username: req.body.username,
        },
     });   
     console.log(users)
     res.send(user) 
    }catch(err){
        res.status(500).send('Error');
    }
}


module.exports.refreshToken = async (req, res) => {
    const { refreshToken: requestToken } = req.body;
  
    if (requestToken == null) {
      return res.status(403).json({ message: "Refresh Token is required!" });
    }
  
    try {
      let refreshToken = await RefreshToken.findOne({ where: { token: requestToken } });
  
      console.log(refreshToken)
  
      if (!refreshToken) {
        res.status(403).json({ message: "Refresh token is not in database!" });
        return;
      }
  
      if (RefreshToken.verifyExpiration(refreshToken)) {
        RefreshToken.destroy({ where: { id: refreshToken.id } });
        
        res.status(403).json({
          message: "Refresh token was expired. Please make a new signin request",
        });
        return;
      }
  
      const user = await refreshToken.getUser();
      let newAccessToken = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: config.jwtExpiration,
      });
  
      return res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: refreshToken.token,
      });
    } catch (err) {
      return res.status(500).send({ message: err });
    }
  };