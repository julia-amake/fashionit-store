import { Category } from 'src/shared/api/common';
import { Pagination } from 'src/shared/types/filterTypes';

export interface CartProduct {
  id: string;
  quantity: number;
}

export interface CartProductFull {
  id: string;
  name: string;
  photo?: string;
  desc?: string;
  price: number;
  oldPrice?: number;
  category: Category | null;
  createdAt: string;
  updatedAt: string;
  commandId: string;
  quantity: number;
}

export interface CartSchema {
  isLoading: boolean;
  error: string;
  entities: { [key: string]: CartProductFull };
  ids: string[];
  inited?: boolean;
  totalCount: number;
}

export interface CartProductsFilters {
  ids?: string[];
  pagination?: Pagination;
}

export interface CartProductsRequest {
  pagination?: string;
  ids?: string;
}
