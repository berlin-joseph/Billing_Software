import React from "react";
import { Select } from "antd";

const CustomDropdown = ({ data, onChange, value }) => {
  const options = data.map((item) => ({
    label: item?.name,
    value: item?._id,
  }));

  return (
    <div>
      <Select
        value={value}
        className="w-full"
        onChange={(value) => onChange(value)}
        options={options}
      />
    </div>
  );
};

export default CustomDropdown;
