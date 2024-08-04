import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fetchProducts } from 'src/entities/Product';
import { logout, signInRTK, signUpRTK } from 'src/features/Auth';
import { createUpdateProduct } from 'src/features/Product';
import { CatalogSchema, ProductsFilters, ProductsResponse } from '../types/productTypes';

const initialState: CatalogSchema = {
  products: null,
  isLoading: false,
  error: '',
  hasMore: false,
  currentPage: 1,
  pageSize: 4,
  sortingType: 'DESC',
  sortingField: 'createdAt',
};

const resetCatalogSlice = (state: CatalogSchema) => {
  state.products = null;
  state.isLoading = false;
  state.error = '';
  state.hasMore = false;
  state.currentPage = 1;
};

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setCurrentPage: (state, { payload }: PayloadAction<number | undefined>) => {
      state.currentPage = payload ? payload : state.currentPage + 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logout, (state) => {
        resetCatalogSlice(state);
      })
      .addMatcher(fetchProducts.matchPending, (state) => {
        state.isLoading = true;
        state.error = '';
        state.hasMore = false;
      })
      .addMatcher(
        fetchProducts.matchFulfilled,
        (
          state,
          {
            payload: {
              data,
              pagination: { pageNumber, pageSize, total },
            },
          }: PayloadAction<ProductsResponse>
        ) => {
          state.products = [...(state.products || []), ...data];
          state.isLoading = false;
          state.error = '';
          state.hasMore = total > pageNumber * pageSize;
        }
      )
      .addMatcher(fetchProducts.matchRejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload as unknown as string;
        state.hasMore = false;
      })
      .addMatcher(signInRTK.matchFulfilled, (state) => {
        resetCatalogSlice(state);
      })
      .addMatcher(signUpRTK.matchFulfilled, (state) => {
        resetCatalogSlice(state);
      })
      .addMatcher(createUpdateProduct.matchFulfilled, (state) => {
        resetCatalogSlice(state);
      });
  },
  selectors: {
    selectCatalogProducts: (state) => state.products,
    selectCatalogIsLoading: (state) => state.isLoading,
    selectCatalogError: (state) => state.error,
    selectCatalogHasMore: (state) => state.hasMore,
    selectCatalogFilter: (state): ProductsFilters => ({
      pagination: {
        pageNumber: state.currentPage,
        pageSize: state.pageSize,
      },
      sorting: {
        type: state.sortingType,
        field: state.sortingField,
      },
    }),
  },
});

export const { setCurrentPage } = catalogSlice.actions;

export const {
  selectCatalogProducts,
  selectCatalogIsLoading,
  selectCatalogError,
  selectCatalogHasMore,
  selectCatalogFilter,
} = catalogSlice.selectors;
export const catalogReducer = catalogSlice.reducer;
