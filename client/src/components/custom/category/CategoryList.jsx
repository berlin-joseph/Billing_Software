import React from "react";
import { Table, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDeleteProductMutation } from "../../../Redux/Api/productApi";
import { useDeleteCategoryMutation } from "../../../Redux/Api/categoryApi";

const CategoryList = ({ data, refetch, onEdit }) => {
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleEdit = (record) => {
    console.log("Edit", record);
    onEdit(record);
  };

  const handleDelete = async (record) => {
    console.log(record, "record");

    try {
      await deleteCategory(record._id).unwrap();
      refetch();
      message.success("Product deleted successfully!");
    } catch (error) {
      message.error("Failed to delete product.");
      console.error("Delete error:", error);
    }
  };

  const columns = [
    {
      title: "Category Name",
      dataIndex: "name",
    },

    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <span>
          <EditOutlined
            onClick={() => handleEdit(record)}
            style={{ cursor: "pointer", marginRight: 8 }}
          />
          <DeleteOutlined
            onClick={() => handleDelete(record)}
            style={{ cursor: "pointer", color: "red" }}
          />
        </span>
      ),
    },
  ];

  return <Table columns={columns} dataSource={data} size="small" />;
};

export default CategoryList;
