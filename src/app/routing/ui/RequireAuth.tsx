import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { selectAuthError, selectAuthIsLoading, selectIsAuth } from 'src/features/Auth';
import { ROUTER_PATHS } from 'src/shared/consts/router';
import { useAppSelector } from 'src/shared/lib/hooks/redux';
import { selectIsAppInited } from '../../model/appSlice';

interface RequireAuthProps {
  redirectTo?: string;
}

export const RequireAuth = ({ redirectTo = ROUTER_PATHS.MAIN }: RequireAuthProps) => {
  const isAppInited = useAppSelector(selectIsAppInited);
  const isAuth = useAppSelector(selectIsAuth);
  const isLoading = useAppSelector(selectAuthIsLoading);
  const isError = useAppSelector(selectAuthError);
  const location = useLocation();

  if (!isAppInited || isLoading) return null;
  if (!isAuth || isError) return <Navigate to={redirectTo} replace state={{ from: location }} />;
  return <Outlet />;
};
