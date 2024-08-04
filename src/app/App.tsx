import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { setIsAppInited } from 'src/app/model/slices/appSlice';
import { setProductsFromLocalStorage } from 'src/features/Cart';
import { LOCAL_STORAGE_VERSION_KEY } from 'src/shared/consts/localStorage';
import { useAppDispatch } from 'src/shared/lib/hooks';

const APP_VERSION = 'v1';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem(LOCAL_STORAGE_VERSION_KEY) === APP_VERSION) return;
    localStorage.clear();
    localStorage.setItem(LOCAL_STORAGE_VERSION_KEY, APP_VERSION);
  }, []);

  useEffect(() => {
    dispatch(setIsAppInited(true));
    dispatch(setProductsFromLocalStorage());
  }, [dispatch]);

  return <Outlet />;
}

export default App;
