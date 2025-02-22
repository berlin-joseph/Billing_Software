import React from "react";
import CustomButton from "../../../billing/src/renderer/src/components/custom/CustomButton";
import { message, Modal, Spin } from "antd";
import { useGetProductsQuery } from "../Redux/Api/productApi";
import CategoryList from "../components/custom/category/CategoryList";
import AddcategoryModel from "../components/custom/category/AddCategory";
import { useGetCategoryQuery } from "../Redux/Api/categoryApi";

const Category = () => {
  const {
    data: productData,
    isError,
    isLoading,
    refetch,
  } = useGetCategoryQuery();
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
        <h1 className="text-2xl font-bold mb-6">Category List</h1>
        <CustomButton button={"Add Category"} onClick={showAddProductModal} />
      </div>

      <div className="py-5">
        {isLoading ? (
          <Spin />
        ) : (
          <CategoryList data={productData?.data ?? []} refetch={refetch} />
        )}
      </div>

      <Modal
        visible={productModalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        <AddcategoryModel onClose={handleModalClose} />
      </Modal>
    </div>
  );
};

export default Category;
