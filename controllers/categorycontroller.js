const category = require("../models/category");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();


const addCategory = async (req, res) => {
    try {
        const catego = await category.create(req.body);
        res.status(200).send(catego);
    } catch (error) {
        console.log(error);
        res.status(500).send({ err: "add category " + error });
    }
}
const updateCategory = async (req,res)=>{
  try {
    const category = await category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).send(category);
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: "update category " + error });
  }
}
const deleteCategory = async (req,res)=>{
  try {
    const category = await category.findByIdAndDelete(req.params.id);
    res.status(200).send(category);
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: "delete category " + error });
  }
}

const getCategory = async (req,res)=>{
  try {
    const category = await category.find({});
    res.status(200).send(category);
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: "get category " + error });
  }
}

module.exports = { addCategory, updateCategory, deleteCategory,getCategory}