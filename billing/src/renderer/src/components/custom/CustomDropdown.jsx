import React from 'react'
import { Select } from 'antd'

const CustomDropdown = ({ data, value, onChange, placeholder, className }) => {
  const options = data?.map((item) => ({
    label: item?.name,
    value: item?._id,
    product_sku: item?.product_sku,
    product_meta: item?.product_meta
  }))

  return (
    <div>
      <Select
        className={className ? className : 'w-full'}
        showSearch
        placeholder={placeholder}
        filterOption={(input, option) => {
          const inputLower = input.toLowerCase()
          const skuMatch = option?.product_sku?.toLowerCase().includes(inputLower)
          const barcodeMatch = option?.product_meta?.barcode?.toLowerCase().includes(inputLower)
          return skuMatch || barcodeMatch || option?.label.toLowerCase().includes(inputLower)
        }}
        options={options}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default CustomDropdown
