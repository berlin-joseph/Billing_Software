import React from "react";
import CustomInput from "../components/custom/CustomInput";
import CustomDropdown from "../components/custom/CustomDropdown";
import CustomButton from "../components/custom/CustomButton";
import { useCreateProductMutation } from "../Redux/slice/productSlice";
import { useGetCategoryQuery } from "../Redux/slice/categorySlice";
import { message } from "antd";

const Products = () => {
  const [productName, setProductName] = React.useState("");
  const [productPrice, setProductPrice] = React.useState("");
  const [productCategory, setProductCategory] = React.useState("Select");
  const [productQuantity, setProductQuantity] = React.useState("");
  const [productUnit, setProductUnit] = React.useState("Select");
  const [image_url, setImage_url] = React.useState("");

  const unit = [
    { _id: "kg", name: "Kilo Gram" },
    { _id: "G", name: "Gram" },
    { _id: "L", name: "Liter" },
  ];

  const [
    createProduct,
    {
      isLoading: createLoading,
      isError: createError,
      isSuccess: createSuccess,
    },
  ] = useCreateProductMutation();

  const { data: categoryData, refetch: refetchCategory } =
    useGetCategoryQuery();

  console.log(categoryData?.data, "categoryData");
  const data = categoryData?.data ?? [];

  const handleClick = async () => {
    try {
      const addResponse = await createProduct({
        productName,
        productPrice,
        productCategory,
        productQuantity,
        productUnit,
        image_url,
      });

      if (addResponse?.data?.status === true) {
        message.success(addResponse?.data?.message);
      } else if (addResponse?.error?.data?.status === false) {
        message.warning(addResponse?.error?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const dropdownCategoryChange = (value) => {
    setProductCategory(value);
  };

  const dropdownUnitChange = (value) => {
    setProductUnit(value);
  };

  return (
    <div className="w-[99%] bg-white py-10 px-5 flex justify-center ml-[1%]">
      <div className="w-full max-w-4xl bg-gray-50 shadow-md rounded-lg p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CustomInput
            placeholder={"Name"}
            type={"text"}
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <CustomInput
            placeholder={"Price"}
            type={"number"}
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
          <CustomInput
            placeholder={"Quantity"}
            type={"number"}
            value={productQuantity}
            onChange={(e) => setProductQuantity(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CustomDropdown
            data={data}
            value={productCategory}
            onChange={dropdownCategoryChange}
          />
          <CustomDropdown
            data={unit}
            value={productUnit}
            onChange={dropdownUnitChange}
          />
        </div>
        <div className="flex justify-end">
          <CustomButton button={"Add"} onClick={handleClick} />
        </div>
      </div>
    </div>
  );
};

export default Products;
