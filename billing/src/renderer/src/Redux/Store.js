import { configureStore } from '@reduxjs/toolkit'
import { productApi } from './Api/productApi'
import { orderApi } from './Api/orderApi'
import productsReducer from './Slice/productsSlice'
import customerReducer from './Slice/customerSlice'
import { authApi } from './Api/authApi'

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    products: productsReducer,
    customer: customerReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productApi.middleware)
      .concat(orderApi.middleware)
      .concat(authApi.middleware)
})
