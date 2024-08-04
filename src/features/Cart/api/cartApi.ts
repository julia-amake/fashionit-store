import {
  ProductsFilters,
  ProductsRequest,
  ProductsResponse,
} from 'src/entities/Product/model/types/productTypes';
import { rtkApi } from 'src/shared/api/rtkApi';
import { transformErrorResponse } from 'src/shared/lib/utils/axios/axiosErrorHandler';

const cartApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    fetchCartProducts: build.query<ProductsResponse, Pick<ProductsFilters, 'ids'>>({
      query: ({ ids }) => {
        const prepareParams: ProductsRequest = {
          ids: JSON.stringify(ids),
          pagination: JSON.stringify({ pageSize: 1000, pageNumber: 1 }),
        };

        return {
          url: '/products',
          params: prepareParams,
        };
      },
      providesTags: ['Cart'],
      transformErrorResponse,
    }),
  }),
});

export const { useFetchCartProductsQuery } = cartApi;
export const { fetchCartProducts } = cartApi.endpoints;
