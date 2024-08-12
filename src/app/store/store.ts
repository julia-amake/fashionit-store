import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from 'src/entities/Cart';
import { catalogReducer } from 'src/entities/Product';
import { authReducer } from 'src/features/Auth';
import { rtkApi } from 'src/shared/api/rtkApi';
import { appReducer } from '../model/appSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    catalog: catalogReducer,
    cart: cartReducer,
    [rtkApi.reducerPath]: rtkApi.reducer,
  },
  devTools: __IS_DEV__,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rtkApi.middleware),
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
