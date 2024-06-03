const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  userName: String,
  userId: Number,
  password: String,
  usertype: String,
  address: {
    addressLineOne: String,
    addressLineTwo: String,
    postalCode: String,
    city: String,
    state: String,
    country: String,
  },
});
userSchema.pre("save", async function (next) {
  const user = this;
  console.log("hello" + user.password);
  console.log("user " + user.userName);
  // Only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Hash the password with the salt
    const hash = await bcrypt.hash(user.password, salt);
    // Replace the plain text password with the hashed one
    user.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare a given password with the database hash
userSchema.methods.comparePassword = function (newPassword) {
  return bcrypt.compare(newPassword, this.password);
};

module.exports = mongoose.model("user", userSchema);
