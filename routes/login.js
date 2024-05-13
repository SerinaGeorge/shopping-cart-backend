const express = require("express");

var router = express.Router();

const users = [
  { username: "user1", password: "she" },
  { usernmae: "user2", password: "password2" },
];

router.post("/login", (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username) {
    return  res.status(200).send("username missing");
    }
    if (!password) {
      return res.status(200).send("password missing");
    }

    const user = users.find((u) => u.username === username);

    
    if (user) {   
        if(user.password === password){
          return res.status(200).send('Login succesfull')

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
