import { Category } from 'src/shared/api/common';
import { Filter } from 'src/shared/types/filterTypes';

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

interface OrderUser {
  id: string;
  name?: string;
  commandId: string;
}

interface OrderProduct {
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
}

interface OrderProductResponse {
  product: OrderProduct | null;
  quantity: number;
}

export interface Order {
  id: string;
  products: OrderProductResponse[];
  user: OrderUser;
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

interface OrderProductRequest {
  id: string;
  quantity: number;
}

export interface OrderCreateBody {
  products: OrderProductRequest[];
  status?: OrderStatusKeys;
}
