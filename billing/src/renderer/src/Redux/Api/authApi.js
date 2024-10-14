import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import base_url from '../constants/constants'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: base_url
  }),
  endpoints: (build) => ({
    login: build.mutation({
      query: ({ mobile, password }) => ({
        url: 'users/login',
        method: 'POST',
        body: { user_mobile: mobile, user_password: password }
      })
    })
  })
})

export const { useLoginMutation } = authApi
