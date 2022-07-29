require("dotenv").config();
const express = require("express");
const {
  getUserProducts,
  deleteProducts,
} = require("../controllers/productController");
const auth = require("../middlewares/auth");

const productsRouter = express.Router();

productsRouter.get("/products", auth, getUserProducts);

productsRouter.delete("/delete/:productId", auth, deleteProducts);

module.exports = productsRouter;
