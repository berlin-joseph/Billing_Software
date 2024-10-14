const Order = require("../schema/orderSchema");
const userModel = require("../schema/userSchema");

exports.createOrder = async (req, res) => {
  try {
    const {
      order_items,
      total_price,
      invoice_date,
      invoice_number,
      user_name,
      user_mobile,
      user_email,
      payment_type,
    } = req.body;

    console.log(req.body, "req.body");

    // Check for required fields
    if (!order_items || !total_price || !invoice_date || !invoice_number) {
      return res.status(400).json({
        status: false,
        message:
          "Missing required fields: order items, total price, invoice date, or invoice number",
      });
    }

    let user = await userModel.findOne({
      $or: [{ user_mobile }, { user_email }],
    });

    if (!user) {
      user = await userModel.create({
        user_name,
        user_mobile,
        user_email,
      });
    }

    // Create the order
    const newOrder = await Order.create({
      order_items,
      total_price,
      invoice_date,
      invoice_number,
      user: user._id,
      payment_type,
    });

    return res.status(201).send({
      status: true,
      success: true,
      message: "Order placed successfully",
      data: newOrder,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        status: false,
        message:
          "Duplicate invoice number. Please use a unique invoice number.",
      });
    }
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};


exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("order_items.product")
      .populate("user");

    if (orders) {
      return res
        .status(200)
        .send({ status: true, success: true, data: orders });
    }
    return res
      .status(400)
      .send({ status: true, success: false, message: "Orders Not Available" });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};