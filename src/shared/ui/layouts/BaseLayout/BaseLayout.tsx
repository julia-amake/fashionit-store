import React, { ReactElement, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import s from './BaseLayout.module.scss';

interface BaseLayoutProps {
  header: ReactElement;
}

export const BaseLayout = ({ header }: BaseLayoutProps) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className={s.outer}>
      <div className={s.header}>{header}</div>
      <main className={s.main}>
        <Outlet />
      </main>
    </div>
  );
};
