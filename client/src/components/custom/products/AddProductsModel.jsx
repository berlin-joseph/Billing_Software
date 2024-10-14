import React, { useState, useCallback } from "react";
import CustomInput from "../../../../../billing/src/renderer/src/components/custom/CustomInput";
import CustomDropdown from "../../../../../billing/src/renderer/src/components/custom/CustomDropdown";
import { Button, Spin } from "antd";
import { useGetCategoryQuery } from "../../../Redux/Api/categoryApi";
import { useCreateProductsMutation } from "../../../Redux/Api/productApi";
import { message } from "antd";

const AddProductsModel = React.memo(({ onClose }) => {
  const dropdownData = [
    { _id: "Kg", name: "Kg" },
    { _id: "G", name: "G" },
    { _id: "L", name: "L" },
    { _id: "Ml", name: "Ml" },
  ];

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [sku, setSku] = useState("");
  const [barcode, setBarcode] = useState("");
  const [unit, setUnit] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);

  const [createProduct, { isLoading: isCreating }] =
    useCreateProductsMutation();
  const { data: categoryData, isError, isLoading } = useGetCategoryQuery();

  const handleAddProduct = useCallback(async () => {
    try {
      const response = await createProduct({
        productName,
        productDescription,
        price,
        category,
        stock,
        brand,
        sku,
        barcode,
        unit,
      }).unwrap();

      console.log(response);

      if (response?.message === "Product created successfully") {
        message.success("Product added successfully!");
        onClose();
      }
    } catch (error) {
      message.error("Failed to create product.");
      console.error("Error:", error);
    }
  }, [
    productName,
    productDescription,
    sku,
    barcode,
    unit,
    category,
    brand,
    stock,
    price,
    createProduct,
    onClose,
  ]);

  if (isLoading) return <Spin />;

  if (isError) return <div>Error loading categories.</div>;

  const productCategory = categoryData?.data || [];

  return (
    <div className="bg-white rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CustomInput
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <CustomInput
          placeholder="Product Description"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
        />
        <CustomInput
          placeholder="SKU"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
        />
        <CustomInput
          placeholder="Barcode"
          type="number"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
        />
        <CustomDropdown
          data={dropdownData}
          placeholder="Select Unit"
          onChange={(value) => setUnit(value)}
        />
        <CustomDropdown
          data={productCategory}
          placeholder="Select Category"
          onChange={(value) => setCategory(value)}
        />
        <CustomInput
          placeholder="Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
        <CustomInput
          placeholder="Stock"
          type="number"
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
        />
        <CustomInput
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <Button type="primary" onClick={handleAddProduct} loading={isCreating}>
          Add Product
        </Button>
      </div>
    </div>
  );
});

export default AddProductsModel;
