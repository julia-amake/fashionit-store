import { rtkApi } from 'src/shared/api/rtkApi';
import { transformErrorResponse } from 'src/shared/lib/utils/transformErrorResponse';
import { FilterResponse } from 'src/shared/types/filterTypes';
import {
  CartProductFull,
  CartProductsFilters,
  CartProductsRequest,
} from '../model/types/cartTypes';

export const cartApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    fetchCartProducts: build.query<
      FilterResponse<Omit<CartProductFull, 'quantity'>>,
      CartProductsFilters
    >({
      query: ({ ids }) => {
        const prepareParams: CartProductsRequest = {
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

export const { fetchCartProducts } = cartApi.endpoints;
