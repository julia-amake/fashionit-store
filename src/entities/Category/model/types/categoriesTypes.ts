import { Category } from 'src/entities/Product';
import { Filter, FilterBaseResponse } from 'src/shared/types/filterTypes';

export interface CategoriesRequest extends Omit<Filter, 'pagination' | 'sorting'> {
  pagination?: string;
  sorting?: string;
}

export interface CategoriesResponse extends FilterBaseResponse {
  data: Category[];
}

export interface CategoryParams {
  name: string;
  photo?: string;
}
