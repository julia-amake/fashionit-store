import React, { ReactNode } from 'react';
import cn from 'clsx';
import s from './ContentLayout.module.scss';

interface ContentLayoutProps {
  sidebarLeft?: ReactNode;
  sidebarRight?: ReactNode;
  children: ReactNode;
  className?: string;
}

export const ContentLayout = ({
  sidebarLeft,
  sidebarRight,
  children,
  className,
}: ContentLayoutProps) => {
  return (
    <div className={cn(s.outer, className)}>
      {sidebarLeft && <div className={s.sidebar}>{sidebarLeft}</div>}
      <div className={s.content}>{children}</div>
      {sidebarRight && <div className={s.sidebar}>{sidebarRight}</div>}
    </div>
  );
};
