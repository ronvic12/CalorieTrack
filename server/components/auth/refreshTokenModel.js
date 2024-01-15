const config = require("./auth.config");
const { v4: uuidv4 } = require("uuid");
const {RefreshToken} = require("./authModel")

module.exports.createToken = async function (user) {
    let expiredAt = new Date();

    expiredAt.setSeconds(expiredAt.getSeconds() + config.jwtRefreshExpiration);

    let _token = uuidv4();

    let refreshToken = await RefreshToken.create({
      token: _token,
      userId: user.id,
      expiryDate: expiredAt.getTime(),
    });

    console.log("Refresh token is ",refreshToken)
    return refreshToken.token;
  };

module.exports.verifyExpiration = (token) => {
    return token.expiryDate.getTime() < new Date().getTime();
  };


