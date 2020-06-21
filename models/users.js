const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  fName: { type: String, required: true },
  lName: { type: String, required: true },
  profilePic: { type: String, required: true },
  github: String,
  linkedin: String,
  website: String,
  skills: [{ type: String }],
  location: String,
  brand: String,
});

const Users = mongoose.model("user", userSchema);

module.exports = Users;
