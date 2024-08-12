import React, { memo } from 'react';
import { CartBar } from 'src/features/cart/CartBar';
import { LangSwitcher } from 'src/features/LangSwitcher';
import { ThemeSwitcher } from 'src/features/ThemeSwitcher';
import { AppLogo } from 'src/shared/ui/AppLogo';
import { HeaderMenu } from '../HeaderMenu/HeaderMenu';
import s from './Header.module.scss';

export const Header = memo(() => {
  return (
    <div className={s.outer}>
      <div className={s.container}>
        <HeaderMenu />
        <AppLogo className={s.logo} />
        <div className={s.right}>
          <LangSwitcher />
          <ThemeSwitcher />
          <CartBar className={s.cart} />
        </div>
      </div>
    </div>
  );
});

Header.displayName = 'Header';
