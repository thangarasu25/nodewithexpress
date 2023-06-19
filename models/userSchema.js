const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  user: { type: String, required: true },
  password: { type: String, required: true, minlength: 5 },
  role: { type: String, required: true },
  tradename : { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobileNo: { type: String, required: true },
  tradeLicenseNo:{ type: String, required: true },
  gstNo: { type: String, required: true },
  addressLine1: { type: String, required: true },
  addressLine2:{ type: String, required: true },
  city: { type: String, required: true },
  pincode:{ type: String, required: true },
  state: { type: String, required: true },
  aadhaar: { type: String, required: false },
  pan: { type:String, required: false },
  gst: { type:String, required: false },
}
);
module.exports = mongoose.model("user", userSchema);


