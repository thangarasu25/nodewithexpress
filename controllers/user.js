const userModel = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const multer = require("multer");
var fs = require('fs');
const File = require("../models/fileSchema");
require("dotenv").config();




const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/userDocument");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
  rename: function (fieldname, filename) {
    return filename.replace(/\W+/g, '-').toLowerCase() + Date.now()
  },
  onFileUploadStart: function (file) {
    console.log(file.fieldname + ' is starting ...')
  },
  onFileUploadData: function (file, data) {
    console.log(data.length + ' of ' + file.fieldname + ' arrived')
  },
  onFileUploadComplete: function (file) {
    console.log(file.fieldname + ' uploaded to  ' + file.path)
  }

})
const uploads = multer(
  { storage: storage },
)
const getAllUser = async (req, res) => {
  try {
    const allUser = await userModel.find({});
    res.status(200).send(allUser);
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: "read user " + error });
  }
};




const AatharuploadDoc = async (req, res, next) => {
  try {
    let userid = req.body.userid;
    if(!userid){
      return res.status(500).send("Userid is missing");
      }
    uploads.single("aatharfile")(req, res, async function (err) {
      if (err) {
        res.send(err);
      } else {
        const sourcePath = req.file.buffer;
        const destinationPath = './uploads/useraathar/' + Date.now() + req.file.originalname;
        fs.writeFileSync(destinationPath, sourcePath, (err) => {
          if (err) {

          } else {
            console.log('File created successfully!');
          }
        });

        if (userid !== "undefined" || userid !== undefined || userid !== null) {
          let name = Date.now() + "Athar" + req.file.originalname.toString();
          let athar = { "createdAt": Date.now(), "filename": name, "userid": userid }
          const filecollection = await File.create(athar);
          await filecollection.save();
          res.status(200).send("aathar Uploaded  successfully");
          userid = null;
        }
        else {
          res.status(500).send("aathar upload is fail");
        }
        next();
      }
    })


  } catch (err) {
    next(err)
  } 

}

const panUploadDoc = async (req, res, next) => {
  try {
    let userid = req.body.userid;
    if(!userid){
      return res.status(500).send("Userid is missing");
      }
    uploads.single("panfile")(req, res, async function (err) {
      if (err) {
        res.send(err);
      } else {
        const sourcePath = req.file.buffer;
        const destinationPath = './uploads/pan/' + Date.now() + req.file.originalname;
        fs.writeFileSync(destinationPath, sourcePath, (err) => {
          if (err) {

          } else {
            console.log('File created successfully!');
          }
        });

        if (userid !== "undefined" || userid !== undefined || userid !== null) {
          let name = Date.now() + "Athar" + req.file.originalname.toString();
          let athar = { "createdAt": Date.now(), "filename": name, "userid": userid }
          const filecollection = await File.create(athar);
          await filecollection.save();
          res.status(200).send("Pan Uploaded  successfully");
          userid = null;
        }
        else {
          res.status(500).send("pan upload is fail");
        }
        next();
      }
    })
  } catch (err) {
    next(err)
  } 

}


const gstUploadDoc = async (req, res, next) => {
  try {
    let userid = req.body.userid;

    if(!userid){
    return res.status(500).send("Userid is missing");
    }
    uploads.single("gstfile")(req, res, async function (err) {
      if (err) {
        res.send(err);
      } else {
        const sourcePath = req.file.buffer;
        const destinationPath = './uploads/gst/' + Date.now() + req.file.originalname;
        fs.writeFileSync(destinationPath, sourcePath, (err) => {
          if (err) {
            console.log("file writeing issue");
          } else {
            console.log('File created successfully!');
          }
        });
        if (userid !== "undefined" || userid !== undefined || userid !== null) {
          let name = Date.now() + "Gst" + req.file.originalname.toString();
          let gst = { "createdAt": Date.now(), "filename": name, "userid": userid }
          const filecollection = await File.create(gst);
          await filecollection.save();
          res.status(200).send("Gst Uploaded  successfully");
          userid = null;
        }
        else {
          res.status(500).send("Gst upload is failed");
        }
        next();
      }
    })
  } catch (err) {
    next(err)
  } 

}

const tradelicUploadDoc = async (req, res, next) => {
  try {
    let userid = req.body.userid;
    if(!userid){
      return res.status(500).send("Userid is missing");
      }
    uploads.single("tradefile")(req, res, async function (err) {
      if (err) {
        res.send(err);
      } else {
        const sourcePath = req.file.buffer;
        const destinationPath = './uploads/trade/' + Date.now() + req.file.originalname;
        fs.writeFileSync(destinationPath, sourcePath, (err) => {
          if (err) {
            console.log("file writeing issue");
          } else {
            console.log('File created successfully!');
          }
        });
        if (userid !== "undefined" || userid !== undefined || userid !== null) {
          let name = Date.now() + "Gst" + req.file.originalname.toString();
          let gst = { "createdAt": Date.now(), "filename": name, "userid": userid }
          const filecollection = await File.create(gst);
          await filecollection.save();
          res.status(200).send("Trade License Uploaded  successfully");
          userid = null;
        }
        else {
          res.status(500).send("TradeLicense upload is failed");
        }
        next();
      }
    })
  } catch (err) {
    next(err)
  } 

}

const register = async (req, res) => {

  const { user, email, password, role, tradename, mobileNo, tradeLicenseNo, gstNo, addressLine1, addressLine2, city, pincode, state, aadhaar, pan, gst, tradeLicense } = req.body;
  try {
    const exist = await userModel.find({ email: email });
    if (exist.length) {
      return res.json({ message: "you are already an user" });
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({
      user, email, password: hashedPassword, role, tradename, mobileNo, tradeLicenseNo, gstNo, addressLine1, addressLine2, city, pincode, state, aadhaar, pan, gst, tradeLicense
    });
    await newUser.save();
    res.status(201).send("User created successfully");
  } catch (error) {
    res.status(400).send("register" + error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userData = await userModel.findOne({ email: email });
    if (!userData) {
      return res
        .status(400)
        .json({ status: 400, massage: "user is not found" });
    }
    if (await bcrypt.compare(password, userData.password)) {
      const token = jwt.sign(
        { id: userData._id, user: userData.user, email: userData.email },
        process.env.ACCESS_TOKEN_SECRET
      );
      const { user, email, password, role, tradename, mobileNo, tradeLicenseNo, gstNo, addressLine1, addressLine2, city, pincode, state, aadhaar, pan, gst, tradeLicense } = userData;
      let obj = { status: true, data: [{ user, email, role, tradename, mobileNo, tradeLicenseNo, gstNo, addressLine1, addressLine2, city, pincode, state, aadhaar, pan, gst, tradeLicense, tokenId: token }] };

     return res.json(obj);
    } else {
      return res.status(400).send("not an user");
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await userModel.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const userTokenvalid = async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.json("token not found" + false);
    }
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!verified) {
      return res.json("not varified user " + false);
    }
    const user = await userModel.find({ email: verified.email });
    // console.log("user" + user);
    if (!user) {
      return res.json("user is not found" + false);
    }
    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const otpGenerate = async (req, res) => {
  try {
    const otp = Math.floor(Math.random() * 1000000);
    res.status(200).json({ otp });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const otpVerify = async (req, res) => {
  try {
    const otp = req.body.otp;
    res.status(200).json({ otp });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getAllUser,
  register,
  login,
  deleteUser,
  userTokenvalid,
  otpGenerate,
  otpVerify,
  AatharuploadDoc,
  panUploadDoc,
  gstUploadDoc,
  tradelicUploadDoc
};
