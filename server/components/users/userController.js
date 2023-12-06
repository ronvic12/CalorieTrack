const userService = require("./userService")
module.exports.userAuth = async(req, res, next) => {
    const data = {
        weight:req.body.weight
    }

     await userService.myFunc(data)
}