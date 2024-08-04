import {
  Product,
  ProductsFilters,
  ProductsRequest,
  ProductsResponse,
} from 'src/entities/Product/model/types/productTypes';
import { rtkApi } from 'src/shared/api/rtkApi';
import { transformErrorResponse } from 'src/shared/lib/utils/axios/axiosErrorHandler';

const productApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    fetchProducts: build.query<ProductsResponse, ProductsFilters>({
      query: ({ pagination, sorting, ids, ...otherParams }) => {
        const prepareParams: ProductsRequest = {
          ...otherParams,
          ids: JSON.stringify(ids),
          pagination: JSON.stringify(pagination),
          sorting: JSON.stringify(sorting),
        };

        return {
          url: '/products',
          params: prepareParams,
        };
      },
      providesTags: [{ type: 'Product', id: 'List' }],
      transformErrorResponse,
    }),
    fetchProductById: build.query<Product, string>({
      query: (id) => ({ url: `products/${id}` }),
      transformErrorResponse,
      providesTags: [{ type: 'Product', id: 'Item' }],
    }),
  }),
});

export const { useFetchProductsQuery, useFetchProductByIdQuery } = productApi;
export const { fetchProducts } = productApi.endpoints;
