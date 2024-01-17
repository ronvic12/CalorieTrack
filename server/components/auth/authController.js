const {Users} = require('./authModel')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken') // it has to become a var not const so it can access all jswon webtoken files
const { Op } = require('sequelize');
const config = require("./auth.config.js");
const {createTokens} = require("./JWT")

module.exports.RegisterAuth = async(req, res, next) => {

  console.log(req.body)
  // json test for api testing
    const data = {
        email:req.body.email,
        FirstName:req.body.FirstName,
        LastName: req.body.LastName,
        username: req.body.username,
        password: req.body.password,
        confirmpassword: req.body.confirmpassword
    }

    if(data.password !== data.confirmpassword) return res.status(400).json({msg:'Password and Confirm Password does not match'});
    const hashpassword = await bcrypt.hash(data.password,10);
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

        if (!user) return res.status(404).send({ message: "User Not Exist." });

        // there is a problem here in the code itself
        const passwordIsValid = bcrypt.compareSync(data.password,user.password);
        if (!passwordIsValid) {
        return res.status(400).json({error: "Invalid Password!",});
      } else{
          const accessToken = createTokens(user)
          res.cookie("access-Token",accessToken,{
            maxAge:60*60*24*30*1000,
            httpOnly: true // for security where it only shows in http not https. 
          })
          res.json("Login Successfully")
      }


    }catch(err){
        console.log(err)
        res.status(500).send('Error');
    }
  
}

module.exports.Profile = async(req,res) =>{
    try{
      res.json("profile")
    }catch(err){
      console.log(err)
    
    }
}


// module.exports.refreshToken = async (req, res) => {
//     const { refreshToken: requestToken } = req.body;
  
//     if (requestToken == null) {
//       return res.status(403).json({ message: "Refresh Token is required!" });
//     }
  
//     try {
//       let refreshToken = await RefreshToken.findOne({ where: { token: requestToken } });
  
//       console.log(refreshToken)
  
//       if (!refreshToken) {
//         res.status(403).json({ message: "Refresh token is not in database!" });
//         return;
//       }
  
//       if (RefreshToken.verifyExpiration(refreshToken)) {
//         RefreshToken.destroy({ where: { id: refreshToken.id } });
        
//         res.status(403).json({
//           message: "Refresh token was expired. Please make a new signin request",
//         });
//         return;
//       }
  
//       const user = await refreshToken.getUser();
//       let newAccessToken = jwt.sign({ id: user.id }, config.secret, {
//         expiresIn: config.jwtExpiration,
//       });
  
//       return res.status(200).json({
//         accessToken: newAccessToken,
//         refreshToken: refreshToken.token,
//       });
//     } catch (err) {
//       return res.status(500).send({ message: err });
//     }
//   };