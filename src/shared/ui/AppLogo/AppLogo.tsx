import React, { memo } from 'react';
import cn from 'clsx';
import { Link } from 'react-router-dom';
import { ROUTER_PATHS } from '../../consts/router';
import s from './AppLogo.module.scss';

interface AppLogoProps {
  className?: string;
}

export const AppLogo = memo(({ className }: AppLogoProps) => {
  return (
    <Link className={cn(s.outer, className)} to={ROUTER_PATHS.MAIN}>
      <span className={s.title}>Fashionit.</span>
      <span className={s.subtitle}>Store</span>
    </Link>
  );
});

AppLogo.displayName = 'AppLogo';
