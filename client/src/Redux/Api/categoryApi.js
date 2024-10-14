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
  }),
});

export const { useGetCategoryQuery } = categoryApi;
