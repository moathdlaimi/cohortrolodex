const mongoose = require("mongoose");
const express = require("express");
const users = express.Router();

const Users = require("../models/users.js");

//=========
//CREATE
//=========
users.post("/", (req, res) => {
  Users.create(req.body, (err, newUser) => {
    if (err) {
      console.log("is this where we hit?");
      res.send(err);
    } else {
      res.json(newUser);
    }
  });
});

//=========
//READ
//=========
users.get("/", (req, res) => {
  Users.find({}, (err, users) => {
    if (err) {
      res.send(err);
    } else {
      res.json(users);
    }
  });
});

//=========
//UPDATE
//=========
users.put("/:id", (req, res) => {
  Users.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedUser) => {
      if (err) {
        res.send(err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

//=========
//DELETE
//=========
users.delete("/:id", (req, res) => {
  Users.findByIdAndRemove(req.params.id, (err, deletedUser) => {
    if (err) {
      res.send(err);
    } else {
      res.json(deletedUser);
    }
  });
});

module.exports = users;
