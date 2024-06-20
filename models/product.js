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
        this.sellerId = object.sellerId
    }

    validator(){
       const productnamepattern = /^[A-Za-z0-9\s\-.]{3,25}$/;
       const productweightpattern = /^\d+(\.\d+)?$/;
       const productweightmetricspattern = /^(kg|g|)?$/;
       const productheightpattern = /^\d+(\.\d+)?$/;
       const productheightmetricspattern =/^(cm|m|in|ft)?$/;
  
     const productdescriptionpattern = /^[A-Za-z\s.]+$/;
const validation ={
    message:[],
    status: true

}
console.log(this.productWeight);
console.log(productweightpattern.test(this.productWeight));
if(this.productName!== undefined && !productnamepattern.test(this.productName)){
    validation.message.push('invalid product name');
  validation.status = false;
}
if(this.productWeight!== undefined && !productweightpattern.test(this.productWeight)){
    validation.message.push('invalid product weight');
  validation.status = false;
}
if(this.productWeightMetrics!== undefined && !productweightmetricspattern.test(this.productWeightMetrics)){
    validation.message.push('invalid product weight metrics');
  validation.status = false;
}
if(this.productHeight!== undefined && !productheightpattern.test(this.productHeight)){
    validation.message.push('invalid product height');
  validation.status = false;

}
if(this.productHeightMetrics!== undefined && !productheightmetricspattern.test(this.productHeightMetrics)){
    validation.message.push('invalid product height metrics');
  validation.status = false;
}


  if(this.productDescription!== undefined && !productdescriptionpattern.test(this.productDescription)){
    validation.message.push('invalid product description');
  validation.status = false;}


  return validation ;

   }
  
   colorvalidator(){
    const productcolorspattern =["blue","red","green","yellow","black","white","orange","brown"];
 const colorvalidated ={
  message : [],
  status : true
 }

var i;
if(this.productColors !== undefined){
for(i=0;i<this.productColors.length;i++){
  if( !productcolorspattern.includes(this.productColors[i])){
colorvalidated.status = false;
colorvalidated.message.push("validation color failed");
  }
  
}}

return colorvalidated;
   }
  
   
  }
