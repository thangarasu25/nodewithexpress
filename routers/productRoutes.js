const express = require("express");
const router = express.Router();
const { authentication, adminAuthentication } = require("../middleware/auth");
const product = require("../controllers/product");


router.get("/getproduct",adminAuthentication, product.getProduct);

router.post("/add",adminAuthentication,product.addProduct);

router.post("/updateproduct/:id",adminAuthentication,product.updateProduct);

router.delete("/deleteproduct/:id",adminAuthentication, product.deleteProduct);


module.exports = router;