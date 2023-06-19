const mongoose = require("mongoose");
var Schema = mongoose.Schema;
// Creating a Schema for uploaded files
const fileSchema = new Schema({

  // categoryname: { type: String, required: true , lowercase: true}
createAt :{type:Date,default:Date.now},
userid:{type:String,required:true},
filename: { type: String, required: true },
});

// Creating a Model from that Schema

module.exports = mongoose.model('files', fileSchema);
// Exporting the Model to use it in app.js File.
