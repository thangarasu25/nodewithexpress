const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const productSchema = new mongoose.Schema({
category: { type: Schema.Types.ObjectId, ref: 'Category'},
productName: { type: String, required: true },
description: { type: String, required: true },
price: { type: Number, required: true },
quantity: { type: Number, required: true },
rating: { type: Number, required: false },
image: { type: String, required: false },
}
);
module.exports = mongoose.model("product", productSchema);

