import React, { memo, useCallback } from 'react';
import cn from 'clsx';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useFetchProfileQuery } from 'src/entities/Profile';
import { getRouteOrders, getRouteProfileSettings } from 'src/shared/consts/router';
import { useAppDispatch } from 'src/shared/lib/hooks';
import { Button } from 'src/shared/ui/Button';
import { Dropdown } from 'src/shared/ui/Dropdown';
import UserIcon from 'src/shared/assets/icons/User.svg';
import { logout } from '../../model/slices/userSlice';
import s from './UserBarMenu.module.scss';

interface UserBarMenuProps {
  className?: string;
}

export const UserBarMenu = memo(({ className }: UserBarMenuProps) => {
  const { data: profile } = useFetchProfileQuery();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleNavigate = useCallback((route: string) => () => navigate(route), [navigate]);

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  if (!profile) return null;

  return (
    <div className={cn(s.outer, className)}>
      <Dropdown position="right">
        <Dropdown.Trigger>
          <Button label={profile?.name} icon={UserIcon} size="s" variant="clean" rounded />
        </Dropdown.Trigger>
        <Dropdown.Item action={handleNavigate(getRouteProfileSettings())}>
          {t('Профиль')}
        </Dropdown.Item>
        <Dropdown.Item action={handleNavigate(getRouteOrders())}>{t('Заказы')}</Dropdown.Item>
        <Dropdown.Item action={handleLogout}>{t('Выйти')}</Dropdown.Item>
      </Dropdown>
    </div>
  );
});

UserBarMenu.displayName = 'UserBarMenu';
