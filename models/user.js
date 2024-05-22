module.exports =  class UserModel {
  constructor(object) {
    console.log("In User Model Constructor")
    this.userName = object.userName;
    this.password = object.password;
    this.usertype = object.usertype;
    // this.address = new Address(object.address);
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
    console.log(userNamePattern.test(this.userName));
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
    console.log("In Address Model Constructor")
    this.addressLineOne = object.addressLineOne;
    this.addressLineTwo = object.addressLineTwo;
    this.postalCode = object.postalCode;
    this.city = object.city;
    this.state = object.state;
    this.country = object.country;
  }

  validator() {}
}


