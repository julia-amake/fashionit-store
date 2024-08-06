import { Category } from 'src/entities/Product';
import { rtkApi } from 'src/shared/api/rtkApi';
import { stringifyNestedObjects } from 'src/shared/lib/utils/stringifyNestedObjects';
import { transformErrorResponse } from 'src/shared/lib/utils/transformErrorResponse';
import { Filter, FilterRequest, FilterResponse } from 'src/shared/types/filterTypes';

const fetchCategoriesParams: FilterRequest = (() => {
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

  return stringifyNestedObjects(params);
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
      transformResponse: (rawResponse: FilterResponse<Category>) => rawResponse.data,
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
