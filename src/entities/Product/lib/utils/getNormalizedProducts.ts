import { getProducts } from '../../mocks/productsMocks';
import { Product } from '../../model/types/productTypes';

export const getNormalizedProducts = () => {
  const products: { [key: string]: Product } = {};
  getProducts(12).forEach((p) => (products[p.id] = p));
  return products;
};
