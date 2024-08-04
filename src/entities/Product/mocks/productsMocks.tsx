import { createRandomProduct } from 'src/homeworks/ts1/3_write';
import { categories } from 'src/homeworks/ts1/mocks';
import { COMMAND_ID } from 'src/shared/consts/api';
import { Product } from '../model/types/productTypes';

export type CategoryName = 'Face' | 'Hair' | 'Body' | 'Makeup' | 'Perfumery';

export const getProducts = (count: number): Product[] => {
  if (count < 1) return [];
  return Array.from({ length: count }, () => createRandomProduct(String(new Date())));
};

export const fakeProduct: Product = {
  id: '1',
  name: 'Название товара',
  desc: 'Короткое описание товара в\u00A0две строки приходит обрезан...',
  photo: 'https://amake.ru/assets/img/abs/rain-1.jpg',
  price: 5600,
  createdAt: String(new Date()),
  category: categories[0],
  commandId: COMMAND_ID,
  updatedAt: String(new Date()),
};
