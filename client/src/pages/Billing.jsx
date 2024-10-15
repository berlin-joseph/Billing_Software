import React, { useState } from "react";
import { useGetOrdersQuery } from "../Redux/Api/orderApi";
import OrderTable from "../components/custom/orders/OrderTable";
import { Modal } from "antd";
import CustomInvoice from "../components/custom/orders/OrdersInvoice";
import Export from "../components/custom/orders/CustomPdfGenerate";

const Billing = () => {
  const { data: orderData } = useGetOrdersQuery();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pdfReady, setPdfReady] = useState(false);

  const handleEyeClick = (order) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
  };

  const handleDownloadClick = (order) => {
    setSelectedOrder(order);
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
      <div className=" hidden">
        <Export invoiceData={selectedOrder} />
      </div>
    </div>
  );
};

export default Billing;
