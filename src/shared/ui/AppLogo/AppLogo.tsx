import React, { memo } from 'react';
import cn from 'clsx';
import { Link } from 'react-router-dom';
import { APP_NAME, APP_SLOGAN } from '../../consts/dict';
import { ROUTER_PATHS } from '../../consts/router';
import s from './AppLogo.module.scss';

interface AppLogoProps {
  className?: string;
}

export const AppLogo = memo(({ className }: AppLogoProps) => {
  return (
    <Link className={cn(s.outer, className)} to={ROUTER_PATHS.MAIN}>
      <span className={s.title}>{APP_NAME}</span>
      <span className={s.subtitle}>{APP_SLOGAN}</span>
    </Link>
  );
});

AppLogo.displayName = 'AppLogo';
