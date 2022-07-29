const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
  product: {
    type: Object,
  },
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Product = model("Product", ProductSchema, "products");

module.exports = Product;
