import React from "react";
import { Table } from "antd";
import { EyeOutlined, DownloadOutlined } from "@ant-design/icons";

const OrderTable = ({ data, handleEyeClick, handleDownloadClick }) => {
  const columns = [
    {
      title: "Invoice Number",
      dataIndex: "invoice_number",
      key: "invoice_number",
    },
    {
      title: "Invoice Date",
      dataIndex: "invoice_date",
      key: "invoice_date",
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Total Price",
      dataIndex: "total_price",
      key: "total_price",
      render: (text) => `$${text}`,
    },
    {
      title: "Action",
      dataIndex: "",
      key: "action",
      render: (_, record) => (
        <div className=" flex  gap-2">
          <EyeOutlined
            onClick={() => handleEyeClick(record)}
            className=" hover:text-blue-400 text-lg"
          />
          <DownloadOutlined
            onClick={() => handleDownloadClick(record)}
            className=" hover:text-blue-400 text-lg"
          />
        </div>
      ),
    },
  ];

  const expandedRowRender = (record) => {
    const productColumns = [
      {
        title: "Product Title",
        dataIndex: ["product", "product_title"],
        key: "product_title",
      },
      {
        title: "Product Price",
        dataIndex: ["product", "product_price"],
        key: "product_price",
        render: (text) => `$${text}`,
      },
      {
        title: "Quantity",
        dataIndex: "product_quantity",
        key: "product_quantity",
      },
      {
        title: "Discount",
        dataIndex: "product_discount",
        key: "product_discount",
      },
    ];

    const productData = record.order_items.map((item) => ({
      ...item,
      product: item.product,
    }));

    return (
      <Table
        columns={productColumns}
        dataSource={productData}
        pagination={false}
        rowKey="_id"
      />
    );
  };

  return (
    <Table
      columns={columns}
      expandable={{
        expandedRowRender,
        rowExpandable: (record) => record.order_items.length > 0,
      }}
      dataSource={data}
      rowKey="invoice_number"
    />
  );
};

export default OrderTable;
