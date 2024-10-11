import React from "react";
import { Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

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

const handleEdit = (record) => {
  console.log("Edit", record);
};

const handleDelete = (record) => {
  console.log("Delete ID:", record);
};

const ProductsList = ({ data }) => {
  console.log(data);
  return (
    <>
      <Table columns={columns} dataSource={data} size="small" />
    </>
  );
};

export default ProductsList;
