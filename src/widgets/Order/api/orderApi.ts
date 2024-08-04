import { rtkApi } from 'src/shared/api/rtkApi';
import { stringifyNestedObjects, transformErrorResponse } from 'src/shared/lib/utils';
import {
  Order,
  OrderCreateRequest,
  OrdersFilter,
  OrdersFilterResponse,
} from '../model/types/orderTypes';

const orderApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    fetchOrders: build.query<Order[], Omit<OrdersFilter, 'pagination' | 'sorting'>>({
      query: (params) => {
        const updatedArgs: OrdersFilter = {
          ...params,
          pagination: {
            pageSize: 1000,
            pageNumber: 1,
          },
          sorting: {
            type: 'DESC',
            field: 'createdAt',
          },
          userId: JSON.stringify(params.userId),
        };

        return {
          url: '/orders',
          params: stringifyNestedObjects(updatedArgs),
        };
      },
      transformResponse: (rawResult: OrdersFilterResponse) => rawResult.data,
      transformErrorResponse,
      providesTags: ['Order'],
    }),
    createOrder: build.mutation<Order, OrderCreateRequest>({
      query: (params) => ({
        url: '/orders',
        method: 'POST',
        body: params,
      }),
      transformErrorResponse,
      invalidatesTags: ['Order'],
    }),
  }),
});

export const { useFetchOrdersQuery, useCreateOrderMutation } = orderApi;
