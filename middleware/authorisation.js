const jwt = require("jsonwebtoken");
const token = require("../services/token.js");

const auth = async (req,res,next) => {
    
const accessToken = req.headers["acess-token"];
const tokenValue = await token.validateToken(accessToken);
if(tokenValue != null){
    req.headers["accessToken"] = tokenValue;
    next();
}
else{
    res.status(403).send("token ivalid");
}
}

module.exports = auth;