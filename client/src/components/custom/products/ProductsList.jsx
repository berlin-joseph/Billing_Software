import React from "react";
import { Table, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDeleteProductMutation } from "../../../Redux/Api/productApi";

const ProductsList = ({ data, refetch, onEdit }) => {
  const [deleteProduct] = useDeleteProductMutation();

  const handleEdit = (record) => {
    console.log("Edit", record);
    onEdit(record);
  };

  const handleDelete = async (record) => {
    try {
      await deleteProduct(record._id).unwrap();
      refetch();
      message.success("Product deleted successfully!");
    } catch (error) {
      message.error("Failed to delete product.");
      console.error("Delete error:", error);
    }
  };

  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
    },
    {
      title: "SKU",
      dataIndex: "product_sku",
    },
    {
      title: "Barcode",
      dataIndex: "product_meta",
      render: (product_meta) => product_meta?.barcode,
    },
    {
      title: "Unit",
      dataIndex: "product_unit",
    },
    {
      title: "Price",
      dataIndex: "product_price",
    },
    {
      title: "Brand",
      dataIndex: "product_brand",
    },
    {
      title: "Category",
      dataIndex: "product_category",
      render: (product_category) => product_category?.category_name,
    },
    {
      title: "Stock",
      dataIndex: "product_stock",
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

export default ProductsList;
