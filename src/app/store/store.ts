import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { rootWatcher } from 'src/app/model/sagas/rootWatcher';
import { catalogReducer } from 'src/entities/Product';
import { logoutListenerMiddleware, userReducer } from 'src/features/Auth';
import { cartReducer } from 'src/features/Cart';
import { rtkApi } from 'src/shared/api/rtkApi';
import { appReducer } from '../model/slices/appSlice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
    cart: cartReducer,
    catalog: catalogReducer,
    [rtkApi.reducerPath]: rtkApi.reducer,
  },
  devTools: __IS_DEV__,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(rtkApi.middleware, sagaMiddleware)
      .prepend(logoutListenerMiddleware.middleware),
});

sagaMiddleware.run(rootWatcher);

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
