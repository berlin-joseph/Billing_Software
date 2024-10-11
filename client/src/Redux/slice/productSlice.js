import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import base_url from "../constants/constants";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: base_url,
  }),
  endpoints: (build) => ({
    createProduct: build.mutation({
      query: ({
        productName,
        productPrice,
        productQuantity,
        productCategory,
        productUnit,
        image_url,
      }) => ({
        url: "products",
        method: "POST",
        body: {
          product_name: productName,
          product_price: productPrice,
          product_category: productCategory,
          stock_quantity: productQuantity,
          unit_of_measure: productUnit,
          image_url,
        },
      }),
    }),
    getProducts: build.query({
      query: () => ({
        url: "products",
      }),
    }),
  }),
});

export const { useCreateProductMutation, useGetProductsQuery } = productApi;
