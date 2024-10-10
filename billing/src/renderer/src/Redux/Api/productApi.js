import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import base_url from '../constants/constants'

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: base_url
  }),
  endpoints: (build) => ({
    getProducts: build.query({
      query: () => ({
        url: 'products'
      })
    })
  })
})

export const { useGetProductsQuery } = productApi
