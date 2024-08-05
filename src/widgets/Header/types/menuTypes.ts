import { ROUTER_PATHS } from 'src/shared/consts/router';

interface MenuListItem {
  id: string;
  name: string;
  link: string;
  end?: boolean;
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
    id: '4',
    name: 'Корзина',
    link: ROUTER_PATHS.CART,
  },
] as const;
