const express = require("express");
const router = express.Router();
const { authentication } = require("../middleware/auth");
const userController = require("../controllers/user");



module.exports = router;