import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from 'src/shared/consts/api';
import { getAuthorizationToken } from 'src/shared/lib/utils';

export const rtkApi = createApi({
  reducerPath: 'rtkApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const token = getAuthorizationToken();
      if (token) headers.set('Authorization', token);
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ['Category', 'Product', 'Profile', 'Cart', 'Order'],
});
