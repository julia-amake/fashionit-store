import type { Meta } from '@storybook/react';
import { getProducts } from '../../mocks/productsMocks';
import { ProductsList } from './ProductsList';

const meta: Meta<typeof ProductsList> = {
  title: 'entities/ProductsList',
  component: ProductsList,
  args: {},
};

export default meta;

export const Default = {
  args: {
    products: getProducts(12),
  },
};
export const IsLoading = { args: { products: null, isLoading: true } };
export const NoProducts = { args: { products: [], isLoading: false } };
