const express = require("express");

var router = express.Router();
const users = require("../database/user.json");

router.post("/login", (req, res) => {
  try { console.log("body----",req.body);
    const { username, password  } = req.body;
    
    if (!username) {
    return  res.status(200).send("username missing");
    }
    if (!password) {
      return res.status(200).send("password missing");
    }

    const user = users.find((u) => u.userName === username);

    
    if (user) {   
        if(user.password === password){
          return res.status(200).send(user.address);

        }
      else{
       return res.status(200).send('password incorrect');
      }  

    } else {
       return res.status(200).send("user not found");
    }

    

  
  } catch (error) {
   return res.send(error);
  }
});

module.exports = router;
