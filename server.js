//=============
//DEPENDENCIES
//=============
const express = require("express");
const mongoose = require("mongoose");
const db = mongoose.connection;
const app = express();
const session = require("express-session");
require("dotenv").config();

//===============
//INITIALIZATION
//===============
app.use(express.json());
app.use(express.static("public"));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(function (req, res, next) {
  if (req.originalUrl && req.originalUrl.split("/").pop() === "favicon.ico") {
    return res.sendStatus(204);
  }

  return next();
});

//=============
//CONTROLLERS
//=============
const usersController = require("./controllers/users.js");
app.use("/users", usersController);
const sessionController = require("./controllers/session.js");
app.use("/session", sessionController);

//=====================
//MONGOOSE AND MONGODB
//=====================

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
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
