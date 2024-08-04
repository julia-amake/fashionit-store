import { createSelector, createSlice, current, type PayloadAction } from '@reduxjs/toolkit';
import { deleteProduct } from 'src/features/Product';
import { LOCAL_STORAGE_CART_PRODUCTS_KEY } from 'src/shared/consts/localStorage';
import {
  AddProductToCartPayload,
  CartSchema,
  RemoveProductToCartPayload,
} from '../types/CartTypes';

const updateLocalStorage = (state: CartSchema) => {
  localStorage.setItem(LOCAL_STORAGE_CART_PRODUCTS_KEY, JSON.stringify(current(state).products));
};

const initialState: CartSchema = { products: {} };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setProductsFromLocalStorage: (state) => {
      const cart = localStorage.getItem(LOCAL_STORAGE_CART_PRODUCTS_KEY);
      if (!cart) return;
      state.products = JSON.parse(cart);
    },
    addProductToCart: {
      reducer: (
        state,
        { payload: { productId, quantity } }: PayloadAction<AddProductToCartPayload>
      ) => {
        const product = state.products[productId];

        if (product) {
          product.quantity += quantity;
        } else {
          state.products[productId] = {
            id: productId,
            quantity,
          };
        }
        updateLocalStorage(state);
      },
      prepare: (productId: string, quantity: number = 1) => ({ payload: { productId, quantity } }),
    },
    removeProductFromCart: {
      reducer: (
        state,
        { payload: { productId, removeAll } }: PayloadAction<RemoveProductToCartPayload>
      ) => {
        const product = state.products[productId];
        if (!product) return;

        if (removeAll || product.quantity <= 1) {
          delete state.products[productId];
        } else {
          state.products[productId].quantity -= 1;
        }
        updateLocalStorage(state);
      },
      prepare: (productId: string, removeAll = false) => ({ payload: { productId, removeAll } }),
    },
    clearCart: (state) => {
      state.products = {};
      localStorage.setItem(LOCAL_STORAGE_CART_PRODUCTS_KEY, JSON.stringify({}));
    },
  },
  extraReducers: (builder) =>
    builder.addMatcher(deleteProduct.matchFulfilled, (state, { type, payload: { id } }) => {
      cartSlice.caseReducers.removeProductFromCart(state, {
        type,
        payload: { productId: id, removeAll: true },
      });
    }),
  selectors: {
    selectCartProducts: (state) => state.products,
  },
});

export const { setProductsFromLocalStorage, addProductToCart, removeProductFromCart, clearCart } =
  cartSlice.actions;
export const { selectCartProducts } = cartSlice.selectors;

export const selectCartIds = createSelector(selectCartProducts, (products) =>
  Object.keys(products)
);

export const selectCartProductsList = () =>
  createSelector(selectCartProducts, (products) => Object.values(products));

export const selectCartItem = (id: string) =>
  createSelector(selectCartProducts, (products) => products[id]);

export const cartReducer = cartSlice.reducer;
