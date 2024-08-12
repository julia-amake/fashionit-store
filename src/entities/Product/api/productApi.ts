import { rtkApi } from 'src/shared/api/rtkApi';
import { stringifyNestedObjects } from 'src/shared/lib/utils/stringifyNestedObjects';
import { transformErrorResponse } from 'src/shared/lib/utils/transformErrorResponse';
import { FilterResponse } from 'src/shared/types/filterTypes';
import { Product, ProductParams, ProductsFilters } from '../model/types/productTypes';

export const productApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    fetchProducts: build.query<FilterResponse<Product>, ProductsFilters>({
      query: (values) => {
        return {
          url: '/products',
          params: stringifyNestedObjects(values),
        };
      },
      providesTags: [{ type: 'Product', id: 'List' }],
      transformResponse: (resp: FilterResponse<Product>) =>
        new Promise((resolve) => setTimeout(() => resolve(resp), 500)),
      transformErrorResponse,
    }),
    fetchProductById: build.query<Product, string>({
      query: (id) => ({ url: `products/${id}` }),
      transformErrorResponse,
      providesTags: [{ type: 'Product', id: 'Item' }],
    }),
    createUpdateProduct: build.mutation<Product, { values: ProductParams; id?: string }>({
      query: ({ values, id }) => ({
        url: id ? `/products/${id}` : '/products',
        method: id ? 'PUT' : 'POST',
        body: values,
      }),
      invalidatesTags: ['Product'],
      transformErrorResponse,
    }),
    deleteProduct: build.mutation<Product, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart', 'Product'],
      transformErrorResponse,
    }),
  }),
});

export const {
  useFetchProductsQuery,
  useFetchProductByIdQuery,
  useCreateUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
export const { fetchProducts, createUpdateProduct, deleteProduct } = productApi.endpoints;
