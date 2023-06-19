const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer")
require("dotenv").config();
app.use(cors());
app.use(express.json());

const dbConnection = async () => {
  try {
   const URI = process.env.MONGODB_URI;
    await mongoose.connect(URI);
    console.log("DataBase connected successfully");
  } catch (err) {
    console.log(`error in database connection err ${err}`);
  }
};
dbConnection();
app.use("/users", require("./routers/userRoutes"));
app.use("/product", require("./routers/productRoutes"));
app.use("/category", require("./routers/categoryRoutes"));


app.get("/", (req, res) => {
  res.send("Home page");
});
app.listen(5000, () => {
  console.log(`server running on the localhost 5000`);
});
