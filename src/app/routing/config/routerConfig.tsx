import React from 'react';
import { createHashRouter, Navigate } from 'react-router-dom';
import App from 'src/app/App';
import { AddProductPage } from 'src/pages/AddProductPage/ui/AddProductPage';
import { CartPage } from 'src/pages/CartPage/ui/CartPage';
import { CatalogPage } from 'src/pages/CatalogPage/ui/CatalogPage';
import { CategoriesPage } from 'src/pages/CategoriesPage';
import { CategoryDetailsPage } from 'src/pages/CategoryDetailsPage/ui/CategoryDetailsPage';
import { OrdersPage } from 'src/pages/OrdersPage';
import { ProductDetailsPage } from 'src/pages/ProductDetailsPage';
import { ProfileSettingsPage } from 'src/pages/profile/ui/ProfileSettingsPage';
import {
  getRouteAddProduct,
  getRouteCart,
  getRouteCatalog,
  getRouteCategories,
  getRouteCategory,
  getRouteForbidden,
  getRouteMain,
  getRouteNotFound,
  getRouteOrders,
  getRouteProduct,
  getRouteProfileSettings,
} from 'src/shared/consts/router';
import { BaseLayout } from 'src/shared/ui/layouts/BaseLayout';
import { Header } from 'src/widgets/Header';
import { RequireAuth } from '../ui/RequireAuth';

export const routerConfig = createHashRouter([
  {
    path: getRouteMain(),
    element: <App />,
    children: [
      {
        element: <BaseLayout header={<Header />} />,
        children: [
          {
            index: true,
            element: <Navigate to={getRouteCatalog()} />,
          },
          {
            path: getRouteCatalog(),
            element: <CatalogPage />,
          },
          {
            path: getRouteCategories(),
            element: <CategoriesPage />,
          },
          {
            path: getRouteCategory(':id'),
            element: <CategoryDetailsPage />,
          },
          {
            path: getRouteProduct(':id'),
            element: <ProductDetailsPage />,
          },
          {
            path: getRouteCart(),
            element: <CartPage />,
          },
          {
            path: getRouteOrders(),
            element: (
              <RequireAuth>
                <OrdersPage />
              </RequireAuth>
            ),
          },
          {
            path: getRouteForbidden(),
            element: <div>У вас нет доступа к этой странице</div>,
          },
          {
            path: getRouteAddProduct(),
            element: (
              <RequireAuth>
                <AddProductPage />
              </RequireAuth>
            ),
          },
          {
            path: getRouteProfileSettings(),
            element: (
              <RequireAuth>
                <ProfileSettingsPage />
              </RequireAuth>
            ),
          },
          { path: getRouteNotFound(), element: <div>Такой страницы не существует</div> },
        ],
      },
    ],
  },
]);
