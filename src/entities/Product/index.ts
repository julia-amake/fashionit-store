export { ProductsList } from './ui/ProductsList';
export {
  catalogReducer,
  selectCatalogProducts,
  selectCatalogIsLoading,
  selectCatalogError,
  selectCatalogHasMore,
  selectCatalogFilter,
  setCurrentPage,
  resetCatalog,
} from './model/slices/productSlice';

export type {
  CatalogSchema,
  Product,
  ProductsFilters,
  ProductsRequest,
  ProductParams,
} from './model/types/productTypes';

export {
  useFetchProductsQuery,
  useFetchProductByIdQuery,
  useCreateUpdateProductMutation,
  useDeleteProductMutation,
  fetchProducts,
  createUpdateProduct,
  deleteProduct,
  productApi,
} from './api/productApi';

export { ProductDetails } from './ui/ProductDetails';
