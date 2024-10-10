import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import base_url from '../constants/constants'

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({
    baseUrl: base_url
  }),
  endpoints: (build) => ({
    createOrder: build.mutation({
      query: ({
        order_items,
        total_price,
        invoice_date,
        invoice_number,
        user_name,
        user_mobile,
        user_email,
        payment_type
      }) => ({
        url: 'orders',
        method: 'POST',
        body: {
          order_items,
          total_price,
          invoice_date,
          invoice_number,
          user_name,
          user_mobile,
          user_email,
          payment_type
        }
      })
    })
  })
})

export const { useCreateOrderMutation } = orderApi
