// import React, { useEffect, useMemo } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import {
//   Table,
//   TableRow,
//   TableHeader,
//   TableHeaderCell,
//   TableBody,
//   TableCell,
//   Pagination,
//   MenuItem,
//   Menu
// } from 'semantic-ui-react'
// import CustomInput from '../CustomInput'
// import CustomButton from '../CustomButton'
// import { removeProduct, updateQuantity, updateDiscount } from '../../../Redux/Slice/productsSlice'
// import CustomDropdown from '../CustomDropdown'

// const ProductsList = React.memo(
//   ({ onTotalChange }) => {
//     const dispatch = useDispatch()
//     const selectedProducts = useSelector((state) => state.products.selectedProducts)
//     const quantities = useSelector((state) => state.products.quantities)
//     const discounts = useSelector((state) => state.products.discounts)

//     const calculateTotal = (price, quantity, discount) => {
//       const total = price * quantity
//       const discountAmount = (total * discount) / 100
//       return total - discountAmount
//     }

//     const handleQuantityChange = (index, value) => {
//       dispatch(updateQuantity({ index, value: Number(value) }))
//     }

//     const handleDiscountChange = (index, value) => {
//       dispatch(updateDiscount({ index, value: Number(value) }))
//     }

//     const handleDeleteClick = (index) => {
//       dispatch(removeProduct(index))
//     }

//     useEffect(() => {
//       const totalAmount = selectedProducts.reduce((acc, product, index) => {
//         const quantity = quantities[index] || 1
//         const discount = discounts[index] || 0
//         const total = calculateTotal(product?.product_price, quantity, discount)
//         return acc + total
//       }, 0)

//       onTotalChange(totalAmount)
//     }, [selectedProducts, quantities, discounts, onTotalChange])

//     // Dropdown
//     const [itemsPerPage, setItemsPerPage] = React.useState(5)
//     const [currentPage, setCurrentPage] = React.useState(1)
//     const totalPages = Math.ceil(selectedProducts.length / itemsPerPage)

//     const dropdownData = useMemo(
//       () => [
//         { _id: 5, name: 5 },
//         { _id: 10, name: 10 },
//         { _id: 15, name: 15 }
//       ],
//       []
//     )

//     return (
//       <div className="bg-white pb-16 px-3 pt-3 rounded-md">
//         <Table celled>
//           <TableHeader>
//             <TableRow>
//               <TableHeaderCell>Product</TableHeaderCell>
//               <TableHeaderCell>Code</TableHeaderCell>
//               <TableHeaderCell>Quantity</TableHeaderCell>
//               <TableHeaderCell>Unit</TableHeaderCell>
//               <TableHeaderCell>Price</TableHeaderCell>
//               <TableHeaderCell>Discount</TableHeaderCell>
//               <TableHeaderCell>Total</TableHeaderCell>
//               <TableHeaderCell>Action</TableHeaderCell>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {selectedProducts.map((product, index) => (
//               <TableRow key={index}>
//                 <TableCell className={'w-[20%]'}>{product?.product_title}</TableCell>
//                 <TableCell className={'w-[20%]'}>{product?.product_meta?.barcode}</TableCell>
//                 <TableCell className={'w-[10%]'}>
//                   <CustomInput
//                     type="number"
//                     value={quantities[index] || ''}
//                     onChange={(e) => handleQuantityChange(index, e.target.value)}
//                   />
//                 </TableCell>
//                 <TableCell className={'w-[10%]'}>{product?.product_unit}</TableCell>
//                 <TableCell className={'w-[10%]'}>{product?.product_price}</TableCell>
//                 <TableCell className={'w-[10%]'}>
//                   <CustomInput
//                     type="number"
//                     value={discounts[index] || ''}
//                     onChange={(e) => handleDiscountChange(index, e.target.value)}
//                   />
//                 </TableCell>
//                 <TableCell className={'w-[10%]'}>
//                   {calculateTotal(
//                     product?.product_price,
//                     quantities[index] || 1,
//                     discounts[index] || 0
//                   )}
//                 </TableCell>
//                 <TableCell className={'w-[10%]'}>
//                   <Menu compact>
//                     <MenuItem icon="delete" as="a" onClick={() => handleDeleteClick(index)} />
//                   </Menu>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>

//         <div className="flex gap-5 justify-end">
//           <CustomDropdown
//             className="h-12"
//             data={dropdownData}
//             value={itemsPerPage}
//             onChange={(value) => setItemsPerPage(Number(value))}
//           />
//           <Pagination
//             activePage={currentPage}
//             totalPages={totalPages}
//             onPageChange={(e, { activePage }) => setCurrentPage(activePage)}
//           />
//         </div>
//       </div>
//     )
//   },
//   (prevProps, nextProps) => {
//     return (
//       prevProps.selectedProduct === nextProps.selectedProduct &&
//       prevProps.quantities === nextProps.quantities &&
//       prevProps.discounts === nextProps.discounts
//     )
//   }
// )

// export default ProductsList

import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Table,
  TableRow,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableCell,
  Pagination,
  MenuItem,
  Menu
} from 'semantic-ui-react'
import CustomInput from '../CustomInput'
import CustomButton from '../CustomButton'
import { removeProduct, updateQuantity, updateDiscount } from '../../../Redux/Slice/productsSlice'
import CustomDropdown from '../CustomDropdown'

const ProductsList = React.memo(
  ({ onTotalChange }) => {
    const dispatch = useDispatch()
    const selectedProducts = useSelector((state) => state.products.selectedProducts)

    const calculateTotal = (price, quantity, discount) => {
      const total = price * quantity
      const discountAmount = (total * discount) / 100
      return total - discountAmount
    }

    console.log(selectedProducts, 'selectedProducts')

    const handleQuantityChange = (index, value) => {
      dispatch(updateQuantity({ index, value: Number(value) }))
    }

    const handleDiscountChange = (index, value) => {
      dispatch(updateDiscount({ index, value: Number(value) }))
    }

    const handleDeleteClick = (index) => {
      dispatch(removeProduct(index))
    }

    useEffect(() => {
      const totalAmount = selectedProducts.reduce((acc, product) => {
        const quantity = product?.product_quantity
        const discount = product?.product_discount
        const total = calculateTotal(product?.product?.product_price, quantity, discount)
        return acc + total
      }, 0)

      onTotalChange(totalAmount)
    }, [selectedProducts, onTotalChange])

    // Pagination
    const [itemsPerPage, setItemsPerPage] = React.useState(5)
    const [currentPage, setCurrentPage] = React.useState(1)
    const totalPages = Math.ceil(selectedProducts.length / itemsPerPage)

    const dropdownData = useMemo(
      () => [
        { _id: 5, name: 5 },
        { _id: 10, name: 10 },
        { _id: 15, name: 15 }
      ],
      []
    )

    return (
      <div className="bg-white pb-16 px-3 pt-3 rounded-md">
        <Table celled>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Product</TableHeaderCell>
              <TableHeaderCell>Code</TableHeaderCell>
              <TableHeaderCell>Quantity</TableHeaderCell>
              <TableHeaderCell>Unit</TableHeaderCell>
              <TableHeaderCell>Price</TableHeaderCell>
              <TableHeaderCell>Discount</TableHeaderCell>
              <TableHeaderCell>Total</TableHeaderCell>
              <TableHeaderCell>Action</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {selectedProducts.map((product, index) => (
              <TableRow key={index}>
                <TableCell className={'w-[20%]'}>{product?.product?.product_title}</TableCell>
                <TableCell className={'w-[20%]'}>
                  {product?.product?.product_meta?.barcode}
                </TableCell>
                <TableCell className={'w-[10%]'}>
                  <CustomInput
                    type="number"
                    value={product.product_quantity || ''}
                    onChange={(e) => handleQuantityChange(index, e.target.value)}
                  />
                </TableCell>
                <TableCell className={'w-[10%]'}>{product?.product?.product_unit}</TableCell>
                <TableCell className={'w-[10%]'}>{product?.product?.product_price}</TableCell>
                <TableCell className={'w-[10%]'}>
                  <CustomInput
                    type="number"
                    value={product.product_discount || ''}
                    onChange={(e) => handleDiscountChange(index, e.target.value)}
                  />
                </TableCell>
                <TableCell className={'w-[10%]'}>
                  {calculateTotal(
                    product?.product?.product_price,
                    product.product_quantity || 1,
                    product.product_discount || 0
                  )}
                </TableCell>
                <TableCell className={'w-[10%]'}>
                  <Menu compact>
                    <MenuItem icon="delete" as="a" onClick={() => handleDeleteClick(index)} />
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex gap-5 justify-end">
          <CustomDropdown
            className="h-12"
            data={dropdownData}
            value={itemsPerPage}
            onChange={(value) => setItemsPerPage(Number(value))}
          />
          <Pagination
            activePage={currentPage}
            totalPages={totalPages}
            onPageChange={(e, { activePage }) => setCurrentPage(activePage)}
          />
        </div>
      </div>
    )
  },
  (prevProps, nextProps) => {
    return (
      prevProps.selectedProduct === nextProps.selectedProduct &&
      prevProps.quantities === nextProps.quantities &&
      prevProps.discounts === nextProps.discounts
    )
  }
)

export default ProductsList
