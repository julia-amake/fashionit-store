export { ProductsList } from './ui/ProductsList';
export type { Product, Category } from './model/types/productTypes';
export {
  catalogReducer,
  selectCatalogProducts,
  selectCatalogIsLoading,
  selectCatalogError,
  selectCatalogHasMore,
  selectCatalogFilter,
  setCurrentPage,
} from './model/slices/catalogSlice';

export { type CatalogSchema } from './model/types/productTypes';

export { useFetchProductsQuery, useFetchProductByIdQuery, fetchProducts } from './api/productApi';
