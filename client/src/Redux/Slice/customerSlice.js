// src/Redux/Slice/customerSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: '',
  mobile: '',
  email: ''
}

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    updateCustomerInfo: (state, action) => {
      const { name, mobile, email } = action.payload
      state.name = name
      state.mobile = mobile
      state.email = email
    },
    resetCustomer: () => initialState
  }
})

export const { updateCustomerInfo, resetCustomer } = customerSlice.actions
export default customerSlice.reducer
