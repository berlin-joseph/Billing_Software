import { configureStore } from '@reduxjs/toolkit'
import { productApi } from './Api/productApi'
import { orderApi } from './Api/orderApi'
import productsReducer from './Slice/productsSlice'
import customerReducer from './Slice/customerSlice'

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    products: productsReducer,
    customer: customerReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware).concat(orderApi.middleware)
})
