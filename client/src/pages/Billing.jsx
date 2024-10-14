import React, { useState, useRef } from "react";
import { useGetOrdersQuery } from "../Redux/Api/orderApi";
import OrderTable from "../components/custom/orders/OrderTable";
import CustomInvoice from "../components/custom/orders/OrdersInvoice";
import { Modal } from "antd";
import Invoice from "../components/custom/orders/CustomDownloadInvoice";

const Billing = () => {
  const { data: orderData } = useGetOrdersQuery();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pdf, setPdf] = useState(false);

  const handleEyeClick = (order) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
    setPdf(false);
  };

  const handleDownloadClick = (order) => {
    setPdf(true);
    setSelectedOrder(order);
  };

  const handleDownloadReady = () => {
    handleCloseModal();
    setPdf(false);
  };

  return (
    <div>
      <OrderTable
        data={orderData?.data ?? []}
        handleEyeClick={handleEyeClick}
        handleDownloadClick={handleDownloadClick}
      />

      <Modal
        title="Invoice Details"
        open={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
        width={800}
      >
        {selectedOrder && (
          <CustomInvoice
            invoiceDataa={selectedOrder}
            onClose={handleCloseModal}
          />
        )}
      </Modal>

      {pdf && (
        <Invoice
          invoiceData={selectedOrder}
          onDownloadReady={handleDownloadReady}
        />
      )}
    </div>
  );
};

export default Billing;
