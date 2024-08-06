import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../consts/api';
import { LOCAL_STORAGE_TOKEN_KEY } from '../consts/localStorage';

export const rtkApi = createApi({
  reducerPath: 'rtkApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
      if (token)
        headers.set('Authorization', `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`);
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ['Category', 'Product', 'Profile', 'Cart', 'Order'],
});
