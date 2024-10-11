import React from "react";
import CustomInput from "../../../../../billing/src/renderer/src/components/custom/CustomInput";
import CustomDropdown from "../../../../../billing/src/renderer/src/components/custom/CustomDropdown";
import { Button } from "antd";

const AddProductsModel = ({ onClose }) => {
  const dropdownData = [
    { _id: "Kg", name: "Kg" },
    { _id: "G", name: "G" },
    { _id: "L", name: "L" },
    { _id: "Ml", name: "Ml" },
  ];

  const productBrand = [
    { _id: "Brand1", name: "Brand 1" },
    { _id: "Brand2", name: "Brand 2" },
    { _id: "Brand3", name: "Brand 3" },
    { _id: "Brand4", name: "Brand 4" },
  ];

  const productCategory = [
    { _id: "Category1", name: "Category 1" },
    { _id: "Category2", name: "Category 2" },
    { _id: "Category3", name: "Category 3" },
    { _id: "Category4", name: "Category 4" },
  ];

  const handleAddProduct = () => {
    onClose();
  };

  return (
    <div className="bg-white rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CustomInput placeholder={"Product Name"} />
        <CustomInput placeholder={"Product Description"} />
        <CustomInput placeholder={"SKU"} />
        <CustomInput placeholder={"Barcode"} type="number" />
        <CustomDropdown data={dropdownData} placeholder={"Select Unit"} />
        <CustomDropdown
          data={productCategory}
          placeholder={"Select Category"}
        />
        <CustomInput placeholder={"Brand"} type="text" />
        <CustomInput placeholder={"Stock"} type="number" />
        <CustomInput placeholder={"Price"} type="number" />
        <Button type="primary" onClick={handleAddProduct}>
          Add Product
        </Button>
      </div>
    </div>
  );
};

export default AddProductsModel;
