const productModel = require("../schema/productSchema");

exports.createProduct = async (req, res) => {
  try {
    const {
      product_title,
      product_description,
      product_price,
      product_category,
      product_stock,
      product_brand,
      product_sku,
      barcode,
    } = req.body;

    const existingProduct = await productModel.findOne({ product_title });
    if (existingProduct) {
      return res.status(400).json({
        status: false,
        message: "Product with this Title already exists",
      });
    }

    const product = await productModel.create({
      product_title,
      product_description,
      product_price,
      product_category,
      product_stock,
      product_brand,
      product_sku,
      product_meta: { barcode },
    });

    res.status(201).json({
      status: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Error creating product",
      error: error.message,
    });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await productModel
      .find()
      .populate("product_category", "category_name description");

    res.status(200).json({
      status: true,
      message: "Products retrieved successfully",
      data: products.map((data) => ({
        ...data._doc,
        name: data.product_title,
      })),
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error fetching products",
      error: error.message,
    });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await productModel
      .findById(req.params.id)
      .populate("product_category", "category_name description");

    if (!product) {
      return res.status(404).json({
        status: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Product retrieved successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error fetching product",
      error: error.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await productModel
      .findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      })
      .populate("product_category", "category_name description");

    if (!updatedProduct) {
      return res.status(404).json({
        status: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Error updating product",
      error: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await productModel.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        status: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error deleting product",
      error: error.message,
    });
  }
};
