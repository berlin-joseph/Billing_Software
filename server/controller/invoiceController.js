const invoiceModel = require("../schema/invoiceSchema");

// Generate a new invoice
exports.generateInvoice = async (req, res) => {
  try {
    const { order, billing, total_amount } = req.body;

    // Generate unique invoice number
    const invoiceNumber = "INV-" + Date.now();

    const invoice = new invoiceModel({
      order,
      billing,
      invoice_number: invoiceNumber,
      total_amount,
    });

    await invoice.save();
    res.status(201).json({
      status: true,
      message: "Invoice generated successfully",
      data: invoice,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Error generating invoice",
      error: error.message,
    });
  }
};

// Get all invoices
exports.getInvoices = async (req, res) => {
  try {
    const invoices = await invoiceModel
      .find()
      .populate("order", "order_items total_price")
      .populate("billing", "billing_address total_amount");

    res.status(200).json({
      status: true,
      message: "Invoices retrieved successfully",
      data: invoices,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error fetching invoices",
      error: error.message,
    });
  }
};

// Get invoice by ID
exports.getInvoiceById = async (req, res) => {
  try {
    const invoice = await invoiceModel
      .findById(req.params.id)
      .populate("order", "order_items total_price")
      .populate("billing", "billing_address total_amount");

    if (!invoice) {
      return res.status(404).json({
        status: false,
        message: "Invoice not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Invoice retrieved successfully",
      data: invoice,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error fetching invoice",
      error: error.message,
    });
  }
};
