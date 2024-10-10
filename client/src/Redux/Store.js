import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./slice/productSlice";
import { categoryApi } from "./slice/categorySlice";

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productApi.middleware)
      .concat(categoryApi.middleware),
});
