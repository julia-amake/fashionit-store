import { Product } from 'src/entities/Product';
import { ProductParams } from 'src/entities/Product/model/types/productTypes';
import { rtkApi } from 'src/shared/api/rtkApi';
import { transformErrorResponse } from 'src/shared/lib/utils/axios/axiosErrorHandler';

const productMutationApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    createUpdateProduct: build.mutation<Product, { values: ProductParams; id?: string }>({
      query: ({ values, id }) => ({
        url: id ? `/products/${id}` : '/products',
        method: id ? 'PUT' : 'POST',
        body: values,
      }),
      invalidatesTags: [{ type: 'Product' }, 'Cart'],
      transformErrorResponse,
    }),
    deleteProduct: build.mutation<Product, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
        invalidatesTags: ['Cart', { type: 'Product' }],
        transformErrorResponse,
      }),
    }),
  }),
});

export const { useCreateUpdateProductMutation, useDeleteProductMutation } = productMutationApi;
export const { createUpdateProduct, deleteProduct } = productMutationApi.endpoints;
