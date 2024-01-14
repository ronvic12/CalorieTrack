const {Users} = require('./authModel')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken') // it has to become a var not const so it can access all jswon webtoken files
const { Op } = require('sequelize');
const config = require("./auth.config.js");
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

        console.log(user)

        if (!user) {
            return res.status(404).send({ message: "User Not found." });
          }

        const passwordIsValid = bcrypt.compareSync(data.password,user.password);
        if (!passwordIsValid) {
        return res.status(401).send({
            message: "Invalid Password!",
        });
    }
    // need to figure out the token part, since this is very crucial.
    console.log("user here",user.id);
    //  fix this later.
        const token = jwt.sign({ id: user.id },
            config.secret,
            {
             algorithm: 'HS256',
             allowInsecureKeySizes: true,
             expiresIn: 86400, // 24 hours
            });
        req.session.token = token;
        res.status(200).send({msg:"Login Succefully"})
    }catch(err){
        console.log(err)
        res.status(500).send('Error');
    }
  
}

module.exports.User = async(req,res,next) =>{
    try{

        console.log("Hello user here");

    const user = await Users.findOne({
        where: {
          username: req.body.username,
        },
     });
    console.log("user name is ",user)
    //  if (user) {
    //     res.json({ user:user });
    //  }
    
    }catch(err){
        res.status(500).send('Error');
    }
}