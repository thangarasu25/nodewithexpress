const productSchema = require("../models/productSchema");

const getProduct = async (req, res) => {
    try {
        const products = await productSchema.find({});
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
const addProduct = async (req, res) => {
    try {
        const product = await productSchema.create(req.body);
        let status = {
            status: "success",
            message: "product added successfully",
            data: product,
        };
        res.json(status);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
const updateProduct = async (req, res) => {
    try {
        const product = await productSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
        let status = {
            status: "success",
            message: "product updated successfully",
            data: product,
        }
        res.json(status);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
const deleteProduct = async (req, res) => {
    try {
        const product = await productSchema.findByIdAndDelete(req.params.id);
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { getProduct, addProduct, updateProduct, deleteProduct };
