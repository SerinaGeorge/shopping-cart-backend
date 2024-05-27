module.exports= class productmodel{
    constructor(object){
        console.log(object.productColors);
        this.productName = object.productName;
        this.productWeight = object.productWeight;
        this.productWeightMetrics = object.productWeightMetrics;
        this.productHeight = object.productHeight;
        this.productHeightMetrics =object.productHeightMetrics;
        this.productColors = object.productColors;
        this.productDescription = object.productDescription;
    }

    validator(){
       const productnamepattern = /^[A-Za-z0-9\s\-.]{3,25}$/;
       const productweightpattern = /^\d+(\.\d+)?$/;
       const productweightmetricspattern = /^(kg|g|)?$/;
       const productheightpattern = /^\d+(\.\d+)?$/;
       const productheightmetricspattern =/^(cm|m|in|ft)?$/;
       const productcolorspattern = /^(' + colors.join('|') + ')$/;
     const productdescriptionpattern = /^[A-Za-z\s.]+$/;
const validation ={
    message:[],
    status: true

}
console.log(this.productWeight);
console.log(productweightpattern.test(this.productWeight));
if(!productnamepattern.test(this.productName)){
    validation.message.push('invalid product name');
  validation.status = false;
}
if(!productweightpattern.test(this.productWeight)){
    validation.message.push('invalid product weight');
  validation.status = false;
}
if(!productweightmetricspattern.test(this.productWeightMetrics)){
    validation.message.push('invalid product weight metrics');
  validation.status = false;
}
if(!productheightpattern.test(this.productHeight)){
    validation.message.push('invalid product height');
  validation.status = false;

}
if(!productheightmetricspattern.test(this.productHeightMetrics)){
    validation.message.push('invalid product height metrics');
  validation.status = false;
}
if(!productcolorspattern.test(this.productcolors)){
    validation.message.push('invalid product colors');
  validation.status = false;
}

  if(!productdescriptionpattern.test(this.productDescription)){
    validation.message.push('invalid product description');
  validation.status = false;}

  return validation ;
   }}