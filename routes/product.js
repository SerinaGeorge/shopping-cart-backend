const express = require("express");

var router = express.Router();
const product = require("../database/product.json");
var productmodel =require("../models/product.js");
const fs =require("fs");
const path = require("path");
const datafile = path.join(__dirname,"../database/product.json");


router.get("/products", (req, res) => {
  return res.status(200).send(product);
  
});

router.get("/products/:id", (req, res) => {
  try {
    const productfound = product.find(
      (e) => e.productId === parseInt(req.params.id)
    );
    if (!productfound) {
      return res.send("product not found");
    }
    return res.status(200).send(productfound);
  } catch (error) {
    return res.send(error(this.toString));
  }
});

router.post("/products", (req, res) => {
  const {
    productname,
    productweight,
    productweightmetrics,
    productheight,
    productheightmetrics,
    productcolors,
    productdescription,
  } = req.body;
  const newproduct =  new productmodel ({
    id: product.length + 1,
    productName: productname,
    productWeight: productweight,
    productWeightMetrics: productweightmetrics,
    productHeight: productheight,
    productHeightMetrics: productheightmetrics,
    productColors: productcolors,
    productDescription: productdescription,
  });
  

const validationresult  = newproduct.validator();
if(validationresult.status){
    product.push(newproduct);
      writedata(product);
  return  res.send(newproduct);

}
else{
   return res.send(JSON.stringify(validationresult.message));
}
});

router.put("/products/:id",(req,res) => { 
    const {
    productname,
    productweight,
    productweightmetrics,
    productheight,
    productheightmetrics,
    productcolors,
    productdescription,
  } = req.body;
    
const match = product.find((e) => e.productId === parseInt(req.params.id));

if(match){
const newmatch = 
new productmodel ({
    productName: productname,
    productWeight: productweight,
    productWeightMetrics: productweightmetrics,
    productHeight: productheight,
    productHeightMetrics: productheightmetrics,
    productColors: productcolors,
    productDescription: productdescription,
  });
  const editvalidated = newmatch.validator();
  if(editvalidated.status){
   match.productName = productname;
   match.productWeight  = productweight;
   match.productWeightMetrics = productweightmetrics;
  match.productHeight = productheight;
   match.productHeightMetrics = productheightmetrics;
   match.productColors = productcolors;
   match.productDescription = productdescription;
  
writedata(product);
return res.send(match);
}
else{
    return res.send(JSON.stringify(editvalidated));
}}
});



router.delete("/products/:id",(req,res) => { 
    
const match = product.find((e) => e.productId === parseInt(req.params.id));
const index =product.findIndex((e) => e.productId === parseInt(req.params.id));

console.log('match is ',match);
console.log('index is ',index);

if(index >= 0){
    product.splice(index,1);
}
return res.send(product);
});

function writedata(product){
const jsonstring = JSON.stringify(product,null,2);
    fs.writeFile(datafile,jsonstring,err => {
       if(err){
        console.log("error");
       }
        else{"file has been written"}

    });
}

module.exports = router;
