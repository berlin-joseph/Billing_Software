import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import base_url from "../constants/constants";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: base_url,
  }),
  endpoints: (build) => ({
    getCategory: build.query({
      query: () => ({
        url: "categories",
      }),
    }),
    createCategory: build.mutation({
      query: ({ category_name }) => ({
        url: "categories",
        method: "POST",
        body: { category_name },
      }),
    }),
    updateCategory: build.mutation({
      query: ({ id, category_name }) => ({
        url: `categories/${id}`,
        method: "PUT",
        body: { category_name },
      }),
    }),
    deleteCategory: build.mutation({
      query: (id) => ({
        url: `categories/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
