import { createEntityAdapter, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { LOCAL_STORAGE_CART_PRODUCTS_KEY } from 'src/shared/consts/localStorage';
import { setProductsToLocalStorage } from '../../utils/simplifiedCartProducts';
import { initializeCart } from '../services/thunks/initializeCartThunk';
import { CartProductFull, CartSchema } from '../types/cartTypes';

export const cartAdapter = createEntityAdapter<CartProductFull, string>({
  selectId: (product) => product.id,
});

const initialState: CartSchema = {
  isLoading: false,
  error: '',
  entities: {},
  ids: [],
  inited: false,
  totalCount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: cartAdapter.getInitialState<CartSchema>(initialState),
  reducers: {
    resetCart: (state) => {
      state.isLoading = false;
      state.error = '';
      cartAdapter.removeAll(state);
      localStorage.removeItem(LOCAL_STORAGE_CART_PRODUCTS_KEY);
      state.totalCount = 0;
    },
    removeProductFromCart: (
      state,
      { payload: { id, count } }: PayloadAction<{ id: string; count: 'one' | 'all' }>
    ) => {
      const currQuantity = state.entities[id]?.quantity;

      if (count === 'all' || currQuantity <= 1) {
        cartAdapter.removeOne(state, id);
        state.totalCount -= currQuantity;
      } else {
        cartAdapter.updateOne(state, { id, changes: { quantity: currQuantity - 1 } });
        state.totalCount -= 1;
      }

      setProductsToLocalStorage(Object.values(state.entities));
    },
    addProductToCart: (state, { payload }: PayloadAction<Omit<CartProductFull, 'quantity'>>) => {
      const currProduct = state.entities[payload.id];

      state.totalCount += 1;

      if (currProduct) {
        cartAdapter.updateOne(state, {
          id: payload.id,
          changes: { quantity: currProduct.quantity + 1 },
        });
      } else {
        cartAdapter.addOne(state, { ...payload, quantity: 1 });
      }

      setProductsToLocalStorage(Object.values(state.entities));
    },
    updateCartProduct: (state, { payload }: PayloadAction<Omit<CartProductFull, 'quantity'>>) => {
      if (!state.ids.includes(payload.id)) return;
      cartAdapter.updateOne(state, { id: payload.id, changes: payload });
    },
    setTotalCount: (state, { payload }: PayloadAction<number>) => {
      state.totalCount = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeCart.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(initializeCart.fulfilled, (state, { payload = [] }) => {
        state.isLoading = false;
        state.error = '';
        state.inited = true;
        cartAdapter.setAll(state, payload);
        setProductsToLocalStorage(payload);
      })
      .addCase(initializeCart.rejected, (state, { payload = '' }) => {
        state.isLoading = false;
        state.inited = true;
        state.error = payload;
        localStorage.removeItem(LOCAL_STORAGE_CART_PRODUCTS_KEY);
      });
  },
  selectors: {
    selectCartIsLoading: (state) => state.isLoading,
    selectCartError: (state) => state.error,
    selectCartTotalCount: (state) => state.totalCount,
  },
});

export const {
  resetCart,
  removeProductFromCart,
  addProductToCart,
  updateCartProduct,
  setTotalCount,
} = cartSlice.actions;
export const { selectCartIsLoading, selectCartError, selectCartTotalCount } = cartSlice.selectors;
export const cartSelector = cartAdapter.getSelectors<RootState>((state) => state.cart);
export const selectCartProductById = (id: string) => (state: RootState) =>
  cartSelector.selectById(state, id);

export const cartReducer = cartSlice.reducer;
