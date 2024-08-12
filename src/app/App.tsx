import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { initializeCart } from 'src/entities/Cart';
import { authInitialize } from 'src/features/Auth';
import { LOCAL_STORAGE_VERSION_KEY } from 'src/shared/consts/localStorage';
import { useAppDispatch, useAppSelector } from 'src/shared/lib/hooks/redux';
import { selectIsAppInited, setIsAppInited } from './model/appSlice';

const APP_VERSION = 'v1';

function App() {
  const dispatch = useAppDispatch();
  const isAppInited = useAppSelector(selectIsAppInited);

  useEffect(() => {
    if (isAppInited) return;
    if (localStorage.getItem(LOCAL_STORAGE_VERSION_KEY) === APP_VERSION) return;
    localStorage.clear();
    localStorage.setItem(LOCAL_STORAGE_VERSION_KEY, APP_VERSION);
  }, [isAppInited]);

  useEffect(() => {
    if (isAppInited) return;
    dispatch(authInitialize());
    dispatch(setIsAppInited(true));
    dispatch(initializeCart());
  }, [dispatch, isAppInited]);

  return <Outlet />;
}

export default App;
