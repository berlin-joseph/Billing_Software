const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    product_title: {
      type: String,
      required: true,
    },
    product_description: {
      type: String,
      required: true,
    },
    product_category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    product_price: {
      type: String,
      required: true,
    },
    product_stock: {
      type: String,
      required: true,
    },
    product_brand: {
      type: String,
      required: true,
    },
    product_sku: {
      type: String,
      required: true,
    },
    product_unit: {
      type: String,
      enum: ["Kg", "G", "L", "Ml"],
    },
    product_meta: {
      barcode: { type: String, required: true },
    },
  },
  { timestamps: true }
);

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;
