import React, { useEffect, useCallback, useMemo } from 'react'
import ProductsList from './components/custom/Products/ProductsList'
import { useGetProductsQuery } from './Redux/Api/productApi'
import CustomInput from './components/custom/CustomInput'
import CustomDropdown from './components/custom/CustomDropdown'
import CustomDatePicker from './components/custom/CustomDatePicker'
import CustomButton from './components/custom/CustomButton'
import ShortUniqueId from 'short-unique-id'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct, removeAllProduct, removeProduct } from './Redux/Slice/productsSlice'
import { resetCustomer, updateCustomerInfo } from './Redux/Slice/customerSlice'
import { useCreateOrderMutation } from './Redux/Api/orderApi'
import { notification } from 'antd'

const App = () => {
  const [paymentType, setPaymentType] = React.useState('cash')
  const dispatch = useDispatch()
  const { data } = useGetProductsQuery()
  const productData = useMemo(() => data?.data || [], [data])

  const selectedProducts = useSelector((state) => state.products.selectedProducts)
  const quantities = useSelector((state) => state.products.quantities)
  const discounts = useSelector((state) => state.products.discounts)

  // Access customer info from Redux state
  const customerInfo = useSelector((state) => state.customer)

  const [selectProduct, setSelectProduct] = React.useState('Select')

  const handleProductChange = useCallback(
    (e) => {
      setSelectProduct(e)
      const selected = productData.find((data) => data?._id === e)
      if (selected) {
        dispatch(addProduct(selected))
      }
    },
    [productData, dispatch]
  )

  const handlePaymentChange = useCallback((e) => {
    setPaymentType(e)
  }, [])

  const [totalAmount, setTotalAmount] = React.useState(0)
  const [paidAmount, setPaidAmount] = React.useState(0)
  const [balanceAmount, setBalanceAmount] = React.useState(0)

  useEffect(() => {
    setBalanceAmount(totalAmount - paidAmount)
  }, [totalAmount, paidAmount])

  const handleTotalChange = useCallback((total) => {
    console.log(total, 'total')

    setTotalAmount(total)
  }, [])

  const [invoiceId, setInvoiceId] = React.useState('')
  useEffect(() => {
    const { randomUUID } = new ShortUniqueId({ length: 10 })
    setInvoiceId(randomUUID())
  }, [])

  const [currentDate, setCurrentDate] = React.useState(moment())
  useEffect(() => {
    setCurrentDate(moment())
  }, [])

  const paymentOptions = [
    { _id: 'cash', name: 'Cash' },
    { _id: 'upi', name: 'UPI' }
  ]

  const handleCustomerInfoChange = (field, value) => {
    dispatch(updateCustomerInfo({ ...customerInfo, [field]: value }))
  }

  const handleUpiClick = useCallback(() => {
    // UPI payment handler logic here
  }, [])

  //
  const [createOrderMutation] = useCreateOrderMutation()

  const orderItems = selectedProducts.map((product) => {
    return {
      product: product.product._id,
      product_quantity: product.product_quantity,
      product_discount: product.product_discount
    }
  })

  const handleCashClick = useCallback(async () => {
    try {
      const res = await createOrderMutation({
        order_items: orderItems,
        total_price: totalAmount,
        invoice_date: currentDate,
        invoice_number: invoiceId,
        user_name: customerInfo?.name,
        user_mobile: customerInfo?.mobile,
        user_email: customerInfo?.email,
        payment_type: paymentType
      })

      if (res?.data?.status && res?.data?.success) {
        notification.open({
          message: `Created Successfully`,
          description: 'Billing Created Successfully'
        })

        dispatch(removeAllProduct())
        dispatch(resetCustomer())
        setSelectProduct('Select')
        setTotalAmount(0)
        setPaidAmount(0)
        setBalanceAmount(0)
      } else if (res?.error?.data?.status === false) {
        notification.open({
          message: `Billing Failed`,
          description: res.error.data.message
        })
      } else {
        notification.open({
          message: `Unexpected Response`,
          description: 'An unexpected error occurred. Please try again later.'
        })
      }
    } catch (error) {
      notification.open({
        message: `Creation Failed`,
        description: error.response?.data?.message || error.message || 'An unknown error occurred.'
      })
    }
  }, [
    createOrderMutation,
    orderItems,
    totalAmount,
    currentDate,
    invoiceId,
    customerInfo,
    paymentType,
    dispatch
  ])

  return (
    <div className="p-5 bg-gray-200 h-screen overflow-scroll">
      <div className="flex justify-between">
        <div className="w-[50%] gap-1 flex flex-col">
          <div className="w-full h-fit flex flex-col gap-2 rounded-lg bg-white p-3">
            <h1 className="text-lg font-semibold">Customer Info</h1>
            <CustomInput
              placeholder={'Name'}
              value={customerInfo.name}
              onChange={(e) => handleCustomerInfoChange('name', e.target.value)}
            />
            <div className="grid grid-cols-2 gap-2">
              <CustomInput
                placeholder={'Mobile'}
                value={customerInfo.mobile}
                onChange={(e) => handleCustomerInfoChange('mobile', e.target.value)}
              />
              <CustomInput
                placeholder={'Email (optional)'}
                value={customerInfo.email}
                onChange={(e) => handleCustomerInfoChange('email', e.target.value)}
              />
            </div>
          </div>

          <div className="w-full rounded-lg bg-white h-full p-3 flex flex-col gap-2 mt-[1%]">
            <h1 className="text-lg font-semibold">Select Product</h1>
            {/* {productData.length > 0 && ( */}
            <CustomDropdown
              data={productData}
              value={selectProduct}
              onChange={handleProductChange}
              placeholder={'Select Or Search'}
            />
            {/* )} */}
          </div>
        </div>

        <div className="w-[49%] flex flex-col gap-2 rounded-lg bg-white p-3">
          <h1 className="text-lg font-semibold">Billing</h1>
          <CustomInput placeholder={'Invoice Number'} value={invoiceId} disabled />
          <CustomDatePicker disabled defaultValue={currentDate} />
          <CustomDropdown
            data={paymentOptions}
            value={paymentType}
            onChange={handlePaymentChange}
          />
          <div className="flex gap-5 w-full">
            <CustomInput
              placeholder={'Total Amount'}
              disabled
              value={totalAmount}
              onChange={(e) => setTotalAmount(Number(e.target.value) || 0)}
            />
            <CustomInput
              placeholder={'Paid Amount'}
              value={paidAmount}
              onChange={(e) => setPaidAmount(Number(e.target.value) || 0)}
            />
            <CustomInput disabled placeholder={'Balance Amount'} value={balanceAmount} />
          </div>
          <CustomButton
            button={`${paymentType === 'upi' ? 'Pay' : 'Complete'}`}
            onClick={paymentType === 'upi' ? handleUpiClick : handleCashClick}
          />
        </div>
      </div>

      <div className="py-5">
        <ProductsList
          selectedProduct={selectedProducts}
          quantities={quantities}
          discounts={discounts}
          onTotalChange={handleTotalChange}
        />
      </div>
    </div>
  )
}

export default React.memo(App)
