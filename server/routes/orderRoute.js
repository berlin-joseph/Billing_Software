const express = require("express");
const { createOrder, getOrders } = require("../controller/orderController");
const router = express.Router();

// Create an order
router.post("/orders", createOrder);
router.get("/orders", getOrders);

module.exports = router;
