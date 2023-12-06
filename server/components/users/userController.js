const userService = require("./userService")
module.exports.userAuth = async(req, res, next) => {
    const data = {
        weight:req.body.weight
    }

     let mydata = await userService.myFunc(data);
     console.log(mydata)
}