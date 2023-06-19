const express = require("express");
const router = express.Router();
const { authentication, adminAuthentication } = require("../middleware/auth");

const category = require("../controllers/categorycontroller");
  

router.get("/getcategory",adminAuthentication, category.getCategory);

router.post("/addcategory",adminAuthentication,category.addCategory);

router.post("/updatecategory/:id",adminAuthentication,category.updateCategory);

router.delete("/deletecategory/:id",adminAuthentication,category.deleteCategory);

module.exports = router;