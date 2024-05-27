const express = require("express");

var router = express.Router();
const users = require("../database/user.json");
var UserModel = require("../models/user.js");

const fs = require("fs");
const path = require("path");
const datafile = path.join(__dirname, "../database/user.json");

//const { error } = require("console");
router.get("/user", (req, res) => {
  try {
    return res.status(200).send(users);
  } catch (error) {
    return res.send(error);
  }
});

router.get("/user/:id", (req, res) => {
  try {
    const idmatch = users.find((u) => u.userId === parseInt(req.params.id));
    if (!idmatch) {
      return res.status(404).send("user not found");
    }
    return res.status(200).send(idmatch);
  } catch (error) {
    return res.send(error);
  }
});

router.post("/user", (req, res) => {
  try {
    
    const { username, password, address, usertype } = req.body;

    const newuser = new UserModel({
      // userId: users.length + 1,
      userName: username,
      password: password,
      address: address,
      usertype: usertype,
    });

    const validationResult = newuser.validator();
    const addressresult = newuser.address.validator();
    console.log("Validation Result : ", JSON.stringify(validationResult));
    console.log("Address validation result : ", JSON.stringify(addressresult));
    if (validationResult.status && addressresult.status) {
      users.push(newuser);
      writedata(users);
      return res.status(200).send(newuser);
    } else {
      return res.status(403).send(JSON.stringify(validationResult )+JSON.stringify( addressresult));
    }
  } catch (error) {
    return res.send(error);
  }
});

router.put("/user/:id", (req, res) => {
  try {
    const { username, password, address, usertype } = req.body;

    const idmatch = users.find((u) => u.userId === parseInt(req.params.id));
    if(idmatch){ 
      
      const edituser = new UserModel({
        // userId: users.length + 1,
        userName: username,
        password: password,
        address: address,
        usertype: usertype,
      });
     const validateduser =  edituser.validator();
     const addressvalidation = edituser.address.validator();
if(validateduser.status && addressvalidation.status)
  {
    idmatch.userName = username;
    idmatch.password = password;
    idmatch.address = address;
    idmatch.usertype = usertype;
    writedata(users);
    return res.send(idmatch );
  }
  else
  {
    return res.send(JSON.stringify(validateduser) +JSON.stringify(addressvalidation) );
  }
    }
 
  } catch (error) {
    return res.send(error);
  }
});
router.delete("/user/:id", (req, res) => {
  try {
    const value = users.find((u) => u.userId === parseInt(req.params.id));
    const index = users.findIndex((u) => u.userId === parseInt(req.params.id));
    if (index >= 0) {
      users.splice(index, 1);
    }
    writedata(users);
    return res.status(200).send(value);
  } catch (error) {
    return res.send(error);
  }
});

function writedata(users) {
  const jsonstring = JSON.stringify(users, null, 2);
  fs.writeFile(datafile, jsonstring, (err) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log("file has been saved ");
    }
  });
}

module.exports = router;
