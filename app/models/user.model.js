// const mongoose = require("mongoose");

// const User = mongoose.model(
//   "User",
//   new mongoose.Schema({
//     username: String,
//     email: String,
//     password: String,
//   })
// );

// module.exports = User;




const mongoose = require("mongoose");
const { validateUser } = require('./userValidation'); // Import the validation function

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
  })
);

module.exports = {
    User,
    validateUser
};

