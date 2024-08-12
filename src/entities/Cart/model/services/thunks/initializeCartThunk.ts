import { setTotalCount } from 'src/entities/Cart';
import { LOCAL_STORAGE_CART_PRODUCTS_KEY } from 'src/shared/consts/localStorage';
import { createAppAsyncThunk } from 'src/shared/lib/utils/asyncThunk';
import { fetchCartProducts } from '../../../api/cartApi';
import { CartProduct, CartProductFull } from '../../types/cartTypes';

export const initializeCart = createAppAsyncThunk()(
  'cart/initialize',
  async (_, { dispatch, rejectWithValue }) => {
    const localProducts = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_CART_PRODUCTS_KEY) || ''
    ) as CartProduct[];
    if (!Array.isArray(localProducts) || !localProducts.length) return;

    const localIds = localProducts.map((item) => item.id);

    try {
      const products = await dispatch(fetchCartProducts.initiate({ ids: localIds })).unwrap();
      if (!products) {
        localStorage.removeItem(LOCAL_STORAGE_CART_PRODUCTS_KEY);
        return rejectWithValue('Failed to request products from the server');
      }

      const fullProducts: CartProductFull[] = [];
      let count = 0;

      localProducts.forEach((product) => {
        const currProduct = products.data.find((p) => p.id === product.id);
        if (!currProduct) return;
        count += product.quantity;

        fullProducts.push({
          ...currProduct,
          quantity: product.quantity,
        });
      });

      dispatch(setTotalCount(count));

      return fullProducts;
    } catch (err) {
      localStorage.removeItem(LOCAL_STORAGE_CART_PRODUCTS_KEY);
      return rejectWithValue(err as string);
    }
  }
);
