import {
  CategoriesRequest,
  CategoriesResponse,
} from 'src/entities/Category/model/types/categoriesTypes';
import { Category } from 'src/entities/Product';
import { rtkApi } from 'src/shared/api/rtkApi';
import { transformErrorResponse } from 'src/shared/lib/utils/axios/axiosErrorHandler';
import { Filter } from 'src/shared/types/filterTypes';

const fetchCategoriesParams: CategoriesRequest = (() => {
  const params: Filter = {
    sorting: {
      type: 'ASC',
      field: 'createdAt',
    },
    pagination: {
      pageNumber: 1,
      pageSize: 100,
    },
  };

  return {
    ...params,
    sorting: JSON.stringify(params.sorting),
    pagination: JSON.stringify(params.pagination),
  };
})();

export const categoriesApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    fetchCategories: build.query<Category[], void>({
      query: () => ({
        url: '/categories',
        params: fetchCategoriesParams,
      }),
      providesTags: [{ type: 'Category', id: 'List' }],
      transformErrorResponse,
      transformResponse: (rawResponse: CategoriesResponse) => rawResponse.data,
    }),
    fetchCategoryById: build.query<Category, string>({
      query: (id) => ({
        url: `/categories/${id}`,
      }),
      transformErrorResponse,
      providesTags: [{ type: 'Category', id: 'Item' }],
    }),
  }),
});

export const { useFetchCategoriesQuery, useFetchCategoryByIdQuery } = categoriesApi;
export const { fetchCategories } = categoriesApi.endpoints;
