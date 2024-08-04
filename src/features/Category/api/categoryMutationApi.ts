import { categoriesApi } from 'src/entities/Category/api/categoriesApi';
import { CategoryParams } from 'src/entities/Category/model/types/categoriesTypes';
import { Category } from 'src/entities/Product';
import { transformErrorResponse } from 'src/shared/lib/utils/axios/axiosErrorHandler';

const categoryMutationApi = categoriesApi.injectEndpoints({
  endpoints: (build) => ({
    createCategory: build.mutation<Category, CategoryParams>({
      query: (body) => ({
        url: '/categories',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Category' }, { type: 'Product' }],
      transformErrorResponse,
    }),
    editCategory: build.mutation<Category, { values: Partial<CategoryParams>; id: string }>({
      query: ({ values, id }) => ({
        url: `/categories/${id}`,
        method: 'PATCH',
        body: values,
      }),
      invalidatesTags: [{ type: 'Category' }, { type: 'Product' }],
      transformErrorResponse,
    }),
    deleteCategory: build.mutation<Category, string>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: 'DELETE',
      }),
      transformErrorResponse,
      invalidatesTags: [{ type: 'Category' }, { type: 'Product' }],
    }),
  }),
});

export const { useCreateCategoryMutation, useEditCategoryMutation, useDeleteCategoryMutation } =
  categoryMutationApi;
