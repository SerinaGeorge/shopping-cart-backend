const express = require("express");
const  mongoose  = require('mongoose');
var router = express.Router();
const product = require("../database/product.json");
var productmodel = require("../models/product.js");
const auth = require("../middleware/authorisation.js");
const fs = require("fs");
const path = require("path");
const datafile = path.join(__dirname, "../database/product.json");
const Product = require("../database/productschem.js");
const token = require("../services/token.js");
router.get("/products",auth, async(req, res) => {
  try{
    const tokenValue = req.headers["accessToken"] ;
    if (tokenValue.userData.usertype == "admin"||tokenValue.userData.usertype =="seller"||tokenValue.userData.usertype =="customer") {
    const fetchdata = await Product.find({});
   return res.send(fetchdata);
  }
  else{
    return res .status(403).send({ message: "invalid user" });
  }
}

  catch(error){
    console.error(error);
   return res.send(error);

  }
  

});

router.get("/products/:id",auth,async (req, res) => {
  const id = req.params.id;

try{
   const tokenValue = req.headers["accessToken"]
  if (tokenValue.userData.usertype == "admin"||tokenValue.userData.usertype =="customer"||tokenValue.userData.usertype=="seller"){

  const recieved =  await Product.findById(id);
 return  res.send([recieved])}
  
  else{
    return res .status(403).send({ message: "invalid user" });
  }
}
 catch(error){
  console.error(error);
  res.status(500).send(error);
 }
});



router.post("/products", auth,async (req, res) => {
  const {
    productname,
    productweight,
    productweightmetrics,
    productheight,
    productheightmetrics,
    productcolors,
    productdescription,
  } = req.body;
  const newproduct = new productmodel({
    id: product.length + 1,
    productName: productname,
    productWeight: productweight,
    productWeightMetrics: productweightmetrics,
    productHeight: productheight,
    productHeightMetrics: productheightmetrics,
    productColors: productcolors,
    productDescription: productdescription,
  });

  const validationresult = newproduct.validator();
  const colorvalidation = newproduct.colorvalidator();
  const editdb = new Product(newproduct);
  if (validationresult.status && colorvalidation.status) {
   // product.push(newproduct);
    try{
      const tokenValue = req.headers["accessToken"]
      if (tokenValue.userData.usertype == "admin"||tokenValue.userData.usertype == "seller"){
    
      await editdb.save();
      res.status(201).json(editdb);
    }
    else{
      return res .status(403).send({ message: "invalid user" });
    }
  }
    catch(error){
      console.log(error.message);
    }
      

    
    return res.status(200).send(newproduct);
  }
   else {
    return res.send(
      JSON.stringify(validationresult.message) +
        JSON.stringify(colorvalidation.message)
    );
  }
});

router.put("/products/:id",auth, async(req, res) => {  

  const {
    productname,
    productweight,
    productweightmetrics,
    productheight,
    productheightmetrics,
    productcolors,
    productdescription,
  } = req.body;

  //const match = product.find((e) => e.productId === parseInt(req.params.id));

 // if (match) {
    const newmatch = new productmodel({
      productName: productname,
      productWeight: productweight,
      productWeightMetrics: productweightmetrics,
      productHeight: productheight,
      productHeightMetrics: productheightmetrics,
      productColors: productcolors,
      productDescription: productdescription,
    });
    const editvalidated = newmatch.validator();
    const editcolorvalidated = newmatch.colorvalidator();
  if (editvalidated.status && editcolorvalidated.status) {
     /* if (productname !== undefined) {
        match.productName = productname;
      }
      if (productweight !== undefined) {
        match.productWeight = productweight;
      }
      if (productweightmetrics !== undefined) {
        match.productWeightMetrics = productweightmetrics;
      }
      if (productheight !== undefined) {
        match.productHeight = productheight;
      }
      if (productheightmetrics !== undefined) {
        match.productHeightMetrics = productheightmetrics;
      }
      if (productcolors !== undefined) {
        match.productColors = productcolors;
      }
      if (productdescription !== undefined) {
        match.productDescription = productdescription;
      }

      try{
        const editproduct = await Product.findByIdAndUpdate(id, { }, { new: true });
        res.send(user);
      
    }
    catch(error){
      console.log(message);
    }

      writedata(product);
      return res.send(match);
    } else {
      return res.send(JSON.stringify(editvalidated));
    }*/
    console.log(newmatch.productWeight+"is here");
    const filter = { _id: new mongoose.Types.ObjectId(req.params.id) }
    const tokenValue = req.headers["accessToken"]
      if (tokenValue.userData.usertype == "admin"||tokenValue.userData.usertype == "seller"){
    
    let update_response = await Product.findOneAndUpdate(filter,{ $set: newmatch });
    return res.send(update_response);
  }
  else{
    return res .status(403).send({ message: "invalid user" });
  }}
  else{
    return res.send(JSON.stringify(editvalidated.message)+(JSON.stringify(editcolorvalidated.message)));
  }
}
);

router.delete("/products/:id",auth,async (req, res) => {
  const {id} = req.params;
  try{
    const tokenValue = req.headers["accessToken"]
    if (tokenValue.userData.usertype == "admin"||tokenValue.userData.usertype == "seller"){
  const deleted =  await Product.findByIdAndDelete(id);
 return  res.send(deleted)}

 else{
  return res .status(403).send({ message: "invalid user" });
 }
    }
 catch(error){
  console.error(error);
  res.status(500).send(error);
 }

 /* const match = product.find((e) => e.productId === parseInt(req.params.id));
  const index = product.findIndex(
    (e) => e.productId === parseInt(req.params.id)
  );

  console.log("match is ", match);
  console.log("index is ", index);

  if (index >= 0) {
    product.splice(index, 1);
  }
  return res.send(product);
});

function writedata(product) {
  const jsonstring = JSON.stringify(product, null, 2);
  fs.writeFile(datafile, jsonstring, (err) => {
    if (err) {
      console.log("error");
    } else {
      ("file has been written");
    }
  });*/

});

module.exports = router;
