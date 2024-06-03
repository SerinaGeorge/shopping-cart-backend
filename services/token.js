const jwt = require('jsonwebtoken') ;

function generatetoken(userid) {

//console.log("hello generate token");
let newtoken;
try {
    //Creating jwt token
    newtoken = jwt.sign(
        {
            _id: userid
            
        },
        "secretkeyappearshere",
        { expiresIn: "1h" }
    );
} catch (err) {
    console.log(err);
    const error =
        new Error("Error! Something went wrong.");
    return next(error);
}

return newtoken ;
}

module.exports = {generatetoken};