const express = require("express");

var router = express.Router();
const users = require("../database/user.json");

router.get("/fetchall", (req, res) => {
  return res.status(200).send(users);
});

router.get("/fetch/:id",(req,res) => {
    const idmatch = users.find((u) => u.userId === parseInt(req.params.id));
    if(!idmatch){
        return res.status(404).send('user not found');
    }
    return res.status(200).send(idmatch);
});

router.post('/adduser',(req,res) => {
    const{username,password,address} = req.body;

const newuser = {
    "userId" : users.length+1,
    "userName": username,
    "password": password,
    "address" : address
}
users.push(newuser);
return res.status(200).send(newuser);
})

router.put("/add/:id",(req,res) => {
    const{username,password,address} = req.body;
    const idmatch = users.find((u) => u.userId === parseInt(req.params.id));
    //console.log(idmatch);
    //console.log(username);
    idmatch.userName = username;
    idmatch.password = password;
    return res.status(200).send(idmatch);
});
 router.delete('/delete/:id',(req,res) => {
    const index = users.findIndex((u) => u.userId === parseInt(req.params.id));
    if(index>0){
    users.splice(index,1);}
    return res.status(200).send(users);

 });

module.exports = router;
