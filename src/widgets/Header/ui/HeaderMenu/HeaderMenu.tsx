import React, { memo } from 'react';
import cn from 'clsx';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import menuStyles from 'src/shared/styles/common/menuList.module.scss';
import { MENU_LIST } from '../../types/menuTypes';

interface HeaderMenuProps {
  className?: string;
}

export const HeaderMenu = memo((props: HeaderMenuProps) => {
  const { className } = props;
  const { t } = useTranslation();

  const linkClassNames = ({ isActive }: { isActive: boolean }) =>
    cn(menuStyles.link, { [menuStyles.link_active]: isActive });

  return (
    <nav className={className}>
      <ul className={menuStyles.menu}>
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
