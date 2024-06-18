const express = require("express");
const jwt = require('jsonwebtoken');
var router = express.Router();
const users = require("../database/user.json");
const User = require("../database/userschem.js");
const token = require("../services/token.js");
const { access } = require("fs");

router.post("/login", async(req, res) => {
  try { console.log("body----",req.body);
    const { username, password  } = req.body;
    
    if (!username) {
    return  res.status(403).send("username missing");
    }
    if (!password) {
      return res.status(403).send("password missing");
    }
    
    // const user = users.find((u) => u.userName === username);
var finduser = await User.findOne({userName: username});
    
    if (finduser) {   
      console.log(finduser.password);
       // if(finduser.password === password)
        if(finduser.comparePassword(password))
        {
          console.log("Login ok " + finduser._id);
           //const createdtoken = 
           delete finduser["password"]
           const acesstoken = token.generatetoken(finduser);
           //console.log(token.generatetoken(finduser._id));
           
          return res.status(200).send({
            "message": "User Logged in Successfully",
            "token": acesstoken,
            "userinfo" : finduser.usertype
            });

        }
      else{
       return res.status(403).send('password incorrect');
      }  

    } else {
       return res.status(403).send("user not found");
    }

    

  
  } catch (error) {
   return res.send(error);
  }
});

module.exports = router;
