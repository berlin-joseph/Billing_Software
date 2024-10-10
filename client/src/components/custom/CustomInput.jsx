import React from "react";
import { Input } from "antd";

const CustomInput = ({ placeholder, onChange, type, value }) => {
  return (
    <div>
      <Input
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        type={type}
      />
    </div>
  );
};

export default CustomInput;
