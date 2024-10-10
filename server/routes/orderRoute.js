const express = require("express");
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} = require("../controller/orderController");
const router = express.Router();

// Create an order
router.post("/orders", createOrder);

module.exports = router;
