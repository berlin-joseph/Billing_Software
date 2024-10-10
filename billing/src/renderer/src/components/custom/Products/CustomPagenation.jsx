import React, { useState } from 'react'
import CustomDropdown from './CustomDropdown' // Adjust the import path as necessary
import TableExamplePagination from './TableExamplePagination' // Adjust the import path as necessary

const ParentComponent = () => {
  const [tableData, setTableData] = useState([])

  const handleProductSelect = (selectedProduct) => {
    const newProduct = {
      id: selectedProduct.value, // or generate a unique ID if needed
      product: selectedProduct.label,
      code: selectedProduct.product_sku,
      quantity: 1, // or any default value you want
      unit: 'Kg', // or any default unit
      discount: '0%', // or any default discount
      total: '$0' // or calculate total if needed
    }

    setTableData((prevData) => [...prevData, newProduct])
  }

  return (
    <div>
      <CustomDropdown
        // data={}
        onChange={handleProductSelect}
      />
      <TableExamplePagination data={tableData} />
    </div>
  )
}

export default ParentComponent
