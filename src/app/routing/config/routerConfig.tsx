import React from 'react';
import { createHashRouter, Navigate } from 'react-router-dom';
import App from 'src/app/App';
import { AddProductPage } from 'src/pages/AddProductPage';
import { CartPage } from 'src/pages/CartPage/ui/CartPage';
import { CatalogPage } from 'src/pages/CatalogPage/ui/CatalogPage';
import { CategoriesPage } from 'src/pages/CategoriesPage';
import { CategoryDetailsPage } from 'src/pages/CategoryDetailsPage';
import { OrdersPage } from 'src/pages/OrdersPage';
import { ProductDetailsPage } from 'src/pages/ProductDetailsPage';
import { ProfileSettingsPage } from 'src/pages/ProfileSettingsPage';
import { ROUTER_PATHS } from 'src/shared/consts/router';
import { BaseLayout } from 'src/shared/ui/layouts/BaseLayout';
import { Header } from 'src/widgets/Header';
import { RequireAuth } from '../ui/RequireAuth';

export const routerConfig = createHashRouter([
  {
    path: ROUTER_PATHS.MAIN,
    element: <App />,
    children: [
      {
        element: <BaseLayout header={<Header />} />,
        children: [
          {
            index: true,
            element: <Navigate to={ROUTER_PATHS.CATALOG} />,
          },
          {
            path: ROUTER_PATHS.CATALOG,
            element: <CatalogPage />,
          },
          {
            path: ROUTER_PATHS.CATEGORIES,
            element: <CategoriesPage />,
          },
          {
            path: ROUTER_PATHS.CATEGORY(':id'),
            element: <CategoryDetailsPage />,
          },
          {
            path: ROUTER_PATHS.PRODUCT(':id'),
            element: <ProductDetailsPage />,
          },
          {
            path: ROUTER_PATHS.CART,
            element: <CartPage />,
          },
          {
            path: ROUTER_PATHS.ORDERS,
            element: (
              <RequireAuth>
                <OrdersPage />
              </RequireAuth>
            ),
          },
          {
            path: ROUTER_PATHS.FORBIDDEN,
            element: <div>У вас нет доступа к этой странице</div>,
          },
          {
            path: ROUTER_PATHS.ADD_PRODUCT,
            element: (
              <RequireAuth>
                <AddProductPage />
              </RequireAuth>
            ),
          },
          {
            path: ROUTER_PATHS.PROFILE_SETTINGS,
            element: (
              <RequireAuth>
                <ProfileSettingsPage />
              </RequireAuth>
            ),
          },
          { path: ROUTER_PATHS.NOT_FOUND, element: <div>Такой страницы не существует</div> },
        ],
      },
    ],
  },
]);
