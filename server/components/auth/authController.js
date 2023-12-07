const authService = require("./authService");

module.exports.RegisterAuth = async(req, res, next) => {
    try{  
        const data = {
        email:req.body.email,
        FirstName:req.body.FirstName,
        LastName: req.body.LastName,
        username: req.body.username,
        password: req.body.password
    }
     let mydata = await authService.register(data);
     res.status(200).send(mydata)
    }catch(err){
        res.status(400).send('Already used this registration ID');
    }
  

}