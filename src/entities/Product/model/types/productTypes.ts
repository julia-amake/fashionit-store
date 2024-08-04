import {
  Filter,
  FilterBaseResponse,
  SortingField,
  SortingType,
} from 'src/shared/types/filterTypes';
import { CategoryName } from '../../mocks/productsMocks';

export interface Category {
  id: string;
  name: CategoryName;
  photo?: string;
}
export interface ProductParams {
  name: string;
  photo?: string;
  desc?: string;
  oldPrice?: number;
  price: number;
  categoryId: string;
}

export interface Product extends Omit<ProductParams, 'categoryId'> {
  id: string;
  createdAt: string;
  updatedAt: string;
  commandId: string;
  category: Category | null;
}

export interface CatalogSchema {
  products: Product[] | null;
  isLoading: boolean;
  error: string;
  hasMore: boolean;
  sortingType: SortingType;
  sortingField: SortingField;
  currentPage: number;
  pageSize: number;
}

export interface ProductsFilters extends Filter {
  categoryIds?: string[];
}

export interface ProductsResponse extends FilterBaseResponse {
  data: Product[];
}

export interface ProductsRequest extends Omit<ProductsFilters, 'pagination' | 'sorting' | 'ids'> {
  pagination?: string;
  sorting?: string;
  ids?: string;
}
