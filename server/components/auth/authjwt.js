var jwt = require("jsonwebtoken");
const config = require("./auth.config.js");
const db = require('./authModel');
const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res.status(401).send({ message: "Unauthorized! Access Token was expired!" });
  }

  return res.sendStatus(401).send({ message: "Unauthorized!" });
}

verifyToken = (req, res, next) => {
    let token = req.session.token;
  
    if (!token) {
      return res.status(403).send({
        message: "No token provided!",
      });
    }


    jwt.verify(token,
        config.secret,
        (err, decoded) => {
         if (err) {
           return res.status(401).send({
             message: "Unauthorized!",
           });
         }
         req.userId = decoded.id;
         next();
        });
}

const authjwt = {
  verifyToken
}

module.exports = authjwt;