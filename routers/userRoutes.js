const express = require("express");
const router = express.Router();
const { authentication,adminAuthentication } = require("../middleware/auth");
const multer = require("multer");
const userController = require("../controllers/user");

router.get("/allProduct",authentication, userController.getAllUser);

router.post("/register", userController.register);
router.post("/aatharupload", multer().single('aatharfile'),userController.AatharuploadDoc);
router.post("/panupload", multer().single('panfile'),userController.panUploadDoc);
router.post("/gstupload", multer().single('gstfile'),userController.gstUploadDoc);
router.post("/tradeupload", multer().single('tradefile'),userController.tradelicUploadDoc);

router.post("/login", userController.login);

router.delete("/delete/:id", authentication, userController.deleteUser);

// router.post("/tokenIsValid", userController.userTokenvalid);
// router.post("/generateotp", userController.otpGenerate);
// router.post("/verify", userController.otpVerify);


module.exports = router;
