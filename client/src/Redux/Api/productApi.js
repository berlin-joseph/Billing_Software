import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import base_url from "../constants/constants";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: base_url,
  }),
  endpoints: (build) => ({
    getProducts: build.query({
      query: () => "products",
    }),
    createProducts: build.mutation({
      query: ({
        productName,
        productDescription,
        price,
        category,
        stock,
        brand,
        sku,
        barcode,
        unit,
      }) => ({
        url: "products",
        body: {
          product_title: productName,
          product_description: productDescription,
          product_price: price,
          product_category: category,
          product_stock: stock,
          product_brand: brand,
          product_sku: sku,
          barcode,
          product_unit: unit,
        },
        method: "POST",
      }),
    }),
    deleteProduct: build.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateProductsMutation,
  useDeleteProductMutation,
} = productApi;
