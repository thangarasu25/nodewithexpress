const userModel = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const getAllUser = async (req, res) => {
    try {
      const allUser = await userModel.find({});
      res.status(200).send(allUser);
    } catch (error) {
      console.log(error);
      res.status(500).send({ err: "read user " + error });
    }
  };

 