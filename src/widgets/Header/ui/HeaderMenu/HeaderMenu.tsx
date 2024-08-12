import React, { memo } from 'react';
import cn from 'clsx';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { selectIsAuth } from 'src/features/Auth';
import { useAppSelector } from 'src/shared/lib/hooks/redux';
import { UserBar } from '../UserBar/UserBar';
import { MENU_LIST } from './menuList';
import s from './HeaderMenu.module.scss';

interface HeaderMenuProps {
  className?: string;
}

export const HeaderMenu = memo(({ className }: HeaderMenuProps) => {
  const isAuth = useAppSelector(selectIsAuth);
  const { t } = useTranslation();

  return (
    <nav className={className}>
      <ul className={s.menu}>
        {MENU_LIST.map(({ name, link, id, requiredAuth }) =>
          !requiredAuth || (requiredAuth && isAuth) ? (
            <li key={id}>
              <NavLink
                to={link}
                end
                className={({ isActive }) => cn(s.link, { [s.link_active]: isActive })}
              >
                {t(name)}
              </NavLink>
            </li>
          ) : null
        )}
        <li>
          <UserBar />
        </li>
      </ul>
    </nav>
  );
});

HeaderMenu.displayName = 'HeaderMenu';
