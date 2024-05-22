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
    console.log("In Add User");
    const { username, password, address, usertype } = req.body;

    const newuser = new UserModel({
      // userId: users.length + 1,
      userName: username,
      password: password,
      // address: address,
      usertype: usertype,
    });

    const validationResult = newuser.validator();
    console.log("Validation Result : ", JSON.stringify(validationResult));
    if (validationResult.status) {
      users.push(newuser);
      writedata(users);
      return res.status(200).send(newuser);
    } else {
      return res.status(403).send(validationResult);
    }
    // if(userValidator("user_name", username)) {
    //   if(userValidator("password", password)) {
    //     if(userValidator("user_type", usertype)) {
    //       users.push(newuser);
    //       writedata(users);

    //       return res.status(200).send(newuser);
    //     } else {
    //       return res.status(403).send("Invalid User Type");
    //     }
    //   } else {
    //     return res.status(403).send("Invalid Password");
    //   }
    // } else {
    //   return res.status(403).send("Invalid User Name");
    // }
    // let user_verified = validateusername(username);
    // if (user_verified == true) {
    //   let userpassword_verified = validatepassword(password);
    //   if (userpassword_verified == true) {
    //     let usertype_verified = validateusertype(usertype);
    //     if (usertype_verified == true) {
    //       users.push(newuser);
    //       writedata(users);

    //       return res.status(200).send(newuser);
    //     } else {
    //       return res.status(404).send("usertype not valid");
    //     }
    //   } else {
    //     return res.status(404).send("password not valid");
    //   }
    // } else {
    //   return res.status(404).send("user name not valid");
    // }
  } catch (error) {
    return res.send(error);
  }
});

router.put("/user/:id", (req, res) => {
  try {
    const { username, password, address, usertype } = req.body;

    const idmatch = users.find((u) => u.userId === parseInt(req.params.id));
    //console.log(idmatch);
    //console.log(username);
    idmatch.userName = username;
    idmatch.password = password;
    idmatch.address = address;
    idmatch.usertype = usertype;
    writedata(users);

    return res.status(200).send(idmatch);
  } catch (error) {
    return res.send(error);
  }
});
router.delete("/user/:id", (req, res) => {
  try {
    const value = users.find((u) => u.userId === parseInt(req.params.id));
    const index = users.findIndex((u) => u.userId === parseInt(req.params.id));
    if (index > 0) {
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

function userValidator(type, value) {
  const userNamePattern = /^[A-Za-z0-9_]{3,25}$/;
  const passwordPattern = /^[^\s]{8,25}$/;
  const userType = ["admin", "customer", "seller"];

  if (type === "user_name") {
    return userNamePattern.test(value);
  } else if (type === "password") {
    return passwordPattern.test(value);
  } else if (type === "user_type") {
    return userType.includes(value);
  }
}

function validateusername(string) {
  const pattern = /^[A-Za-z0-9_]{3,25}$/;
  return pattern.test(string);
}

function validatepassword(password) {
  const pattern = /^[^\s]{8,25}$/;
  return pattern.test(password);
}

function validateusertype(usertype) {
  const userType = {
    customer: "customer",
    seller: "seller",
    admin: "admin",
  };
  if (Object.values(userType).includes(usertype)) {
    return true;
  } else {
    return false;
  }
}
module.exports = router;
