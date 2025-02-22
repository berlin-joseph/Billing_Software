import React, { useState, useCallback } from "react";
import CustomInput from "../../../../../billing/src/renderer/src/components/custom/CustomInput";
import { Button, Spin } from "antd";
import { useCreateCategoryMutation } from "../../../Redux/Api/categoryApi";
import { message } from "antd";

const AddcategoryModel = React.memo(({ onClose }) => {
  const [categoryName, setCategoryName] = useState("");

  const [createCategory, { isLoading, isError }] = useCreateCategoryMutation();

  const handleAddProduct = useCallback(async () => {
    try {
      const response = await createCategory({
        category_name: categoryName,
      }).unwrap();

      console.log(response);

      if (response?.message === "Category created successfully") {
        setCategoryName("");
        message.success("Category added successfully!");
        // onClose();
      }
    } catch (error) {
      message.error("Failed to create category.");
      console.error("Error:", error);
    }
  }, [categoryName, createCategory, onClose]);

  if (isLoading) return <Spin />;

  if (isError) return <div>Error loading categories.</div>;

  return (
    <div className="bg-white rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CustomInput
          placeholder="Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />

        <Button type="primary" onClick={handleAddProduct} loading={isLoading}>
          Add Category
        </Button>
      </div>
    </div>
  );
});

export default AddcategoryModel;
