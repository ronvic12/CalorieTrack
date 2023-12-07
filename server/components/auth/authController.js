const authService = require("./authService");

module.exports.RegisterAuth = async(req, res, next) => {
    const data = {
        email:req.body.email,
        FirstName:req.body.FirstName,
        LastName: req.body.LastName,
        username: req.body.username,
        password: req.body.password
    }

    console.log("Data here",data)

     let mydata = await authService.register(data);

}