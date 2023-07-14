const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const url = process.env.MONGO_URL;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database Connected");
    // Rest of your code that depends on the database connection
  })
  .catch((err) => console.log("Database Error", err.message));

// Define the User model outside of the functions
const UserModel = mongoose.model("User", {
  name: String,
  email: String,
  password: String,
  balance: Number,
});

// create user account
function create(name, email, password) {
  const user = new UserModel({ name, email, password, balance: 0 });
  return user.save();
}

// find user account
function find(email) {
  return UserModel.find({ email }).exec();
}

// find user account
function findOne(email) {
  return UserModel.findOne({ email }).exec();
}

// update - deposit/withdraw amount
function update(email, balance) {
  return UserModel.findOneAndUpdate({ email }, { $inc: { balance } }, { new: true }).exec();
}

// all users
function all() {
  return UserModel.find({}).exec();
}

module.exports = { create, findOne, find, update, all };
