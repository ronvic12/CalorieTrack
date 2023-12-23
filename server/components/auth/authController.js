const {Users} = require('./authModel')
const bcrypt = require('bcrypt');
const {jwt} = require('jsonwebtoken')


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