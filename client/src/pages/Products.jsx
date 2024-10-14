import React from "react";
import CustomButton from "../../../billing/src/renderer/src/components/custom/CustomButton";
import ProductsList from "../components/custom/products/ProductsList";
import { message, Modal, Spin } from "antd";
import AddProductsModel from "../components/custom/products/AddProductsModel";
import { useGetProductsQuery } from "../Redux/Api/productApi";

const Products = () => {
  const {
    data: productData,
    isError,
    isLoading,
    refetch,
  } = useGetProductsQuery();
  const [productModalVisible, setProductModalVisible] = React.useState(false);

  React.useEffect(() => {
    if (isError) {
      message.error("Failed to fetch products.");
    }
  }, [isError]);

  const showAddProductModal = () => {
    setProductModalVisible(true);
  };

  const handleModalClose = () => {
    setProductModalVisible(false);
    refetch();
  };

  return (
    <div className="bg-white h-screen ml-[1%] p-[3%]">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-6">Products List</h1>
        <CustomButton button={"Add Products"} onClick={showAddProductModal} />
      </div>

      <div className="py-5">
        {isLoading ? (
          <Spin />
        ) : (
          <ProductsList data={productData?.data ?? []} refetch={refetch} />
        )}
      </div>

      <Modal
        visible={productModalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        <AddProductsModel onClose={handleModalClose} />
      </Modal>
    </div>
  );
};

export default Products;
