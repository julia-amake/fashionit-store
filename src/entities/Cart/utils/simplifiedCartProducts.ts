import { LOCAL_STORAGE_CART_PRODUCTS_KEY } from 'src/shared/consts/localStorage';
import { CartProductFull } from '../model/types/cartTypes';

export const setProductsToLocalStorage = (products: CartProductFull[]) => {
  const simplifiedCartItems = (cartItems: CartProductFull[]) =>
    cartItems.map(({ id, quantity }) => ({
      id,
      quantity,
    }));

  localStorage.setItem(
    LOCAL_STORAGE_CART_PRODUCTS_KEY,
    JSON.stringify(simplifiedCartItems(products))
  );
};
