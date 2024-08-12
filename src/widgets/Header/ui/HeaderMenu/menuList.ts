import { ROUTER_PATHS } from 'src/shared/consts/router';

interface MenuListItem {
  id: string;
  name: string;
  link: string;
  requiredAuth?: boolean;
}

export const MENU_LIST: MenuListItem[] = [
  {
    id: '1',
    name: 'Каталог',
    link: ROUTER_PATHS.CATALOG,
  },
  {
    id: '2',
    name: 'Категории',
    link: ROUTER_PATHS.CATEGORIES,
  },
  {
    id: '3',
    name: 'Заказы',
    link: ROUTER_PATHS.ORDERS,
    requiredAuth: true,
  },
] as const;
