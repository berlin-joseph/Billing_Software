import React from 'react'
import { Input } from 'antd'

const CustomInput = ({ placeholder, onChange, type, value, disabled }) => {
  return (
    <div className=" flex-1">
      <Input
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        type={type}
        disabled={disabled}
        min="0"
      />
    </div>
  )
}

export default CustomInput
