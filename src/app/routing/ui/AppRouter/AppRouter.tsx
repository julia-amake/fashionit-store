import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { routerConfig } from '../../config/routerConfig';

export const AppRouter = () => {
  return <RouterProvider router={routerConfig} />;
};
