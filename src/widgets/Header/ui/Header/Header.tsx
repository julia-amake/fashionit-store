import React, { memo } from 'react';
import { UserBar } from 'src/features/Auth';
import { LangSwitcher } from 'src/features/LangSwitcher/ui/LangSwitcher';
import { ThemeSwitcher } from 'src/features/ThemeSwitcher/ui/ThemeSwitcher';
import { AppLogo } from 'src/shared/ui/AppLogo';
import { HeaderMenu } from '../HeaderMenu';
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
          <UserBar />
        </div>
      </div>
    </div>
  );
});

Header.displayName = 'Header';
