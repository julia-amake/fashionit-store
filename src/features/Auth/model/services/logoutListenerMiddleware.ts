import { createListenerMiddleware } from '@reduxjs/toolkit';
import { categoriesApi } from 'src/entities/Category/api/categoriesApi';
import { logout } from '../slices/userSlice';

export const logoutListenerMiddleware = createListenerMiddleware();

logoutListenerMiddleware.startListening({
  actionCreator: logout,
  effect: (action, listenerApi) => {
    listenerApi.dispatch(
      categoriesApi.util.invalidateTags([
        { type: 'Category' },
        { type: 'Product' },
        'Profile',
        'Cart',
        'Order',
      ])
    );
  },
});
