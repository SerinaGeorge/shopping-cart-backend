const express = require("express");
const mongoose = require("mongoose");
var router = express.Router();
const users = require("../database/user.json");
var UserModel = require("../models/user.js");
const token = require("../services/token.js");
const auth = require("../middleware/authorisation.js");
const fs = require("fs");
const path = require("path");
const datafile = path.join(__dirname, "../database/user.json");
const User = require("../database/userschem.js");

//const { error } = require("console");
router.get("/user", auth, async (req, res) => {
  try {

    const tokenValue = req.headers["accessToken"] ;
    
    if (tokenValue.userData.usertype == "admin") {
      var fetchdata = await User.find({});
      return res.status(200).send(fetchdata);
    } else {
      return res
        .status(403)
        .send({ message: "User not authorised to fetch user list" });
    }
  } catch (error) {
    console.log("Error in Get All Users ", error);
    return res.send(error.message);
  }
});

router.get("/user/:id",auth,async (req, res) => {
  try {
    const id = req.params.id;  
    const tokenValue = req.headers["accessToken"]
    if (tokenValue.userData.usertype == "admin"){

    const fetchdata = await User.findById(id);

    return res.status(200).send([fetchdata]);
  } 
  else{
   // return res.send("user not authorised");
   if(tokenValue.userData._id == id){
    const getdata = await User.findById(id);
    return res.status(200).send([getdata]);
    
   }
   else{
    return res.send("user not authorised");

   }
  }

}catch (error) {
    return res.send(error);
  }
}
);

router.post("/user", async (req, res) => {
  try {
    const { username, password, address, usertype } = req.body;
console.log("hello"+JSON.stringify(req.body));
    const newuser = new UserModel({
      // userId: users.length + 1,
      userName: username,
      password: password,
      address: address,
      usertype: usertype,
    });

    const validationResult = newuser.validator();
    const addressresult = newuser.address.validator();
    console.log("message---" + JSON.stringify(newuser));
    const postdb = new User(newuser);
    console.log("Validation Result : ", JSON.stringify(validationResult));
    console.log("Address validation result : ", JSON.stringify(addressresult));
    if (validationResult.status && addressresult.status) {
      // users.push(newuser);
      try {
        console.log(postdb);
        await postdb.save();
        res.status(200).send(postdb);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      return res
        .status(403)
        .send(JSON.stringify(validationResult) + JSON.stringify(addressresult));
    }
  } catch (error) {
    return res.send(error);
  }
});

router.put("/user/:id",auth, async (req, res) => {
  try {
    const { username, password, address, usertype } = req.body;
    console.log(username);
    //const idmatch = users.find((u) => u.userId === parseInt(req.params.id));
    //if(idmatch){

    const edituser = new UserModel({
      // userId: users.length + 1,
      userName: username,
      password: password,
      address: address,
      usertype: usertype,
    });
    const validateduser = edituser.validator();
    const addressvalidation = edituser.address.validator();
    //console.log("hers "+validateduser.status);
    //console.log("hers "+addressvalidation.status);
    if (validateduser.status && addressvalidation.status) {
      /*
    idmatch.userName = username;
    idmatch.password = password;
    idmatch.address = address;
    idmatch.usertype = usertype;
    writedata(users);
    return res.send(idmatch );
  
  */
    const tokenValue = req.headers["accessToken"]
  console.log("Token Value", tokenValue);
  if (tokenValue.userData.usertype == "admin"){


      const filter = { _id: new mongoose.Types.ObjectId(req.params.id) };
      console.log("here" + filter);
      let update_response = await User.findOneAndUpdate(filter, {
        $set: edituser,
      });
      res.send(update_response);
    } 
    else{
      if(tokenValue.userData._id == req.params.id){
        
      const filter = { _id: new mongoose.Types.ObjectId(req.params.id) };
      console.log("here" + filter);
      let updateresponse = await User.findOneAndUpdate(filter, {
        $set: edituser,
      });
      res.send(updateresponse);
      }
    }
  }

    else {
      return res.send(
        JSON.stringify(validateduser) + JSON.stringify(addressvalidation)
      );
    }
  } catch (error) {
    return res.send(error.message);
  }
});
router.delete("/user/:id",auth, async (req, res) => {
  try {
    const id = req.params.id;
    const tokenValue = req.headers["accessToken"]
    console.log("Token Value", tokenValue);
    if (tokenValue.userData.usertype == "admin"){

    const deleted = await User.findByIdAndDelete(id);

    return res.status(200).send(deleted);
  }
  else{
    return res.send("user not authorised");
  }
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
