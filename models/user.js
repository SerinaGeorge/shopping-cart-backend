module.exports =  class UserModel {
  constructor(object) {
    console.log("In User Model Constructor")
    this.userName = object.userName;
    this.password = object.password;
    this.usertype = object.usertype;
   this.address = new Address(object.address);
  }

  validator() {
    console.log("In User Validator");
    const userNamePattern = /^[A-Za-z0-9_]{3,25}$/;
    const passwordPattern = /^[^\s]{8,25}$/;
    const userTypePattern = ["admin", "customer", "seller"];
    const validation = {
        message: [],
        status: true
    }
    
    if(!userNamePattern.test(this.userName)) {
        validation.message.push("Invalid User Name");
        validation.status = false;
    }
    if(!passwordPattern.test(this.password)) {
        validation.message.push("Invalid Password");
        validation.status = false;
    }
    if(!userTypePattern.includes(this.usertype)) {
        validation.message.push("Invalid User Type");
        validation.status = false;
    }

    return validation;
  }
}

class Address {
  constructor(object) {
    console.log("In Address Model Constructor");
    this.addressLineOne = object.addressLineOne;
    this.addressLineTwo = object.addressLineTwo;
    this.postalCode = object.postalCode;
    this.city = object.city;
    this.state = object.state;
    this.country = object.country;
  }

  validator() {
    const addresslineonepattern = /^\d{2}$/;
    const addresslinetwopattern = /^[A-Z]\s{2,21}$/;
    const postalcodepattern = /^[1-9][0-9]{5}$/;
    const citypattern = /^[A-Z]{3,15}$/;
    const statepattern = /^[A-Z]{3,15}$/;
    const countrypattern =/^[A-Z]{3,15}$/;
const validation = {
"message": [],
status : true
}
console.log(this.addressLineOne);
  if(!addresslineonepattern.test(this.addressLineOne)){
validation.message.push('addresslineone not valid');
validation.status = false;}
if(!addresslinetwopattern.test(this.addressLineTwo)){
  validation.message.push('addresslinetwo not valid');
validation.status = false;
}
if(!postalcodepattern.test(this.postalCode)){
  validation.message.push('postalcode not valid');
validation.status = false;
}
if(!citypattern.test(this.city)){
  validation.message.push('city not valid');
validation.status = false;
}

if(!citypattern.test(this.city)){
  validation.message.push('city not valid');
validation.status = false;
}

if(!statepattern.test(this.state)){
  validation.message.push('state not valid');
validation.status = false;
}
if(!countrypattern.test(this.country)){
  validation.message.push('country not valid');
validation.status = false;
}
return validation;
  }
}