const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    order_items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        product_quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        product_discount: {
          type: Number,
          default: 0,
          min: 0,
        },
      },
    ],
    total_price: {
      type: Number,
      required: true,
      min: 0,
    },
    invoice_date: {
      type: Date,
      required: true,
    },
    invoice_number: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    payment_type: {
      type: String,
      enum: ["cash", "card", "upi"],
      default: "cash",
    },
  },
  { timestamps: true }
);

const orderModel = mongoose.model("Order", orderSchema);

module.exports = orderModel;
