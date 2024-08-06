import React, { memo } from 'react';
import cn from 'clsx';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { MENU_LIST } from '../../types/menuTypes';
import s from './HeaderMenu.module.scss';

interface HeaderMenuProps {
  className?: string;
}

export const HeaderMenu = memo((props: HeaderMenuProps) => {
  const { className } = props;
  const { t } = useTranslation();

  const linkClassNames = ({ isActive }: { isActive: boolean }) =>
    cn(s.link, { [s.link_active]: isActive });

  return (
    <nav className={className}>
      <ul className={s.menu}>
        {MENU_LIST.map(({ name, link, id }) => (
          <li key={id}>
            <NavLink className={linkClassNames} to={link}>
              {t(name)}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
});

HeaderMenu.displayName = 'HeaderMenu';
