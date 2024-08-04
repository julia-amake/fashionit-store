import { Product } from 'src/entities/Product';
import { User } from 'src/entities/Profile';
import { CartProduct } from 'src/features/Cart';
import { Filter, FilterBaseResponse } from 'src/shared/types/filterTypes';

export interface OrderProduct {
  _id: string; // служебный id, не id продукта
  product: Product;
  quantity: number;
}

export const OrderStatus = {
  pending_confirmation: 'Ожидает подтверждения',
  processing: 'В обработке',
  packaging: 'Собирается на складе',
  waiting_for_delivery: 'Собран, ожидает отправки',
  in_transit: 'В пути',
  delivered: 'Доставлен',
  return_requested: 'Запрошен возврат',
  order_cancelled: 'Отменен',
} as const;

type OrderStatusKeys = KeyOf<typeof OrderStatus>;

export interface Order {
  id: string;
  products: OrderProduct[];
  user: User;
  status: OrderStatusKeys;
  createdAt: string;
  updatedAt: string;
  commandId: string;
}

export interface OrdersFilter extends Omit<Filter, 'name'> {
  productIds?: string[];
  userId?: string;
  status?: OrderStatusKeys;
}

export interface OrdersFilterResponse extends FilterBaseResponse {
  data: Order[];
}

export interface OrderCreateRequest {
  products: CartProduct[];
  status?: OrderStatusKeys;
}
