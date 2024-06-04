const jwt = require("jsonwebtoken");

function generatetoken(userData) {
  //console.log("hello generate token");
  let newtoken;
  try {
    //Creating jwt token
    newtoken = jwt.sign({userData}, "secretkeyappearshere", { expiresIn: "1h" });
  } catch (err) {
    console.log(err);
    const error = new Error("Error! Something went wrong.");
    return next(error);
  }

  return newtoken;
}

function validateToken(token) {
  try {
    var decoded = jwt.verify(token, "secretkeyappearshere");
    console.log("Decoded Value ", decoded);
    return decoded;
  } catch (error) {
    console.log("Error in Validate Token ", error.message);
    return null;
  }
}

module.exports = { generatetoken, validateToken };
