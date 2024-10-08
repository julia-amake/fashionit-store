export const ROUTER_PATHS = {
  MAIN: '/',
  PROFILE: '/profile',
  PROFILE_SETTINGS: '/profile/settings',
  CATEGORIES: '/categories',
  CATEGORY: (id: string) => `/categories/${id}`,
  CATALOG: '/catalog',
  PRODUCT: (id: string) => `/catalog/${id}`,
  CART: '/cart',
  ORDERS: '/orders',
  FORBIDDEN: '/forbidden',
  NOT_FOUND: '*',
} as const;
