//=============
//DEPENDENCIES
//=============
const express = require("express");
const mongoose = require("mongoose");
const db = mongoose.connection;
const app = express();
require("dotenv").config();

//===============
//INITIALIZATION
//===============
app.use(express.json());
app.use(express.static("public"));
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

const usersController = require("./controllers/users.js");
app.use("/users", usersController);

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// Error / success
db.on("error", (err) => console.log(err.message + " is Mongod not running?"));
db.on("connected", () => console.log("mongo connected: ", MONGODB_URI));
db.on("disconnected", () => console.log("mongo disconnected"));

//=============
//LISTENER
//=============
app.listen(PORT, () => {
  console.log("Listening to port", PORT);
});
