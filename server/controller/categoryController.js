const categoryModel = require("../schema/categorySchema");

exports.createCategory = async (req, res) => {
  const { category_name } = req.body;
  try {
    const ExistCategory = await categoryModel.findOne({ category_name });

    if (ExistCategory) {
      return res.status(400).send({
        status: false,
        success: false,
        message: `${ExistCategory.category_name} Already Exists`,
      });
    }

    const category = await categoryModel.create({ category_name });

    if (category) {
      return res.status(201).send({
        status: true,
        success: true,
        message: "Category Created Successfully",
        data: category,
      });
    }

    res.status(400).send({
      status: false,
      success: false,
      message: "Category Not Created",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find();
    res.status(200).send({
      status: true,
      success: true,
      message: "Categories Retrieved Successfully",
      data: categories?.map((data) => ({
        ...data?._doc,
        name: data?.category_name,
      })),
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await categoryModel.findById(req.params.id);
    if (!category) {
      return res.status(404).send({
        status: false,
        success: false,
        message: "Category Not Found",
      });
    }
    res.status(200).send({
      status: true,
      success: true,
      message: "Category Retrieved Successfully",
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const category = await categoryModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!category) {
      return res.status(404).send({
        status: false,
        success: false,
        message: "Category Not Found",
      });
    }
    res.status(200).send({
      status: true,
      success: true,
      message: "Category Updated Successfully",
      data: category,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      success: false,
      message: "Invalid Category Update",
      error: error.message,
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await categoryModel.findByIdAndDelete(req.params.id);

    console.log(category);

    if (!category) {
      return res.status(404).send({
        status: false,
        success: false,
        message: "Category Not Found",
      });
    }
    res.status(200).send({
      status: true,
      success: true,
      message: "Category Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
