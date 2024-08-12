import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useFetchProfileQuery } from 'src/entities/Profile';
import { logout, selectIsAuth } from 'src/features/Auth';
import { ROUTER_PATHS } from 'src/shared/consts/router';
import { useAppDispatch, useAppSelector } from 'src/shared/lib/hooks/redux';
import { Dropdown } from 'src/shared/ui/Dropdown';
import s from './UserBarMenu.module.scss';

interface UserBarMenuProps {
  className?: string;
}

export const UserBarMenu = memo(({ className }: UserBarMenuProps) => {
  const isAuth = useAppSelector(selectIsAuth);
  const { data: profile } = useFetchProfileQuery(undefined, { skip: !isAuth });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleNavigateProfile = useCallback(
    () => navigate(ROUTER_PATHS.PROFILE_SETTINGS),
    [navigate]
  );
  const handleLogout = useCallback(() => dispatch(logout()), [dispatch]);

  if (!profile) return null;

  return (
    <Dropdown className={className} position="left">
      <Dropdown.Trigger>
        <div className={s.user}>{t('Профиль')}</div>
      </Dropdown.Trigger>
      <Dropdown.Item action={handleNavigateProfile}>{t('Профиль')}</Dropdown.Item>
      <Dropdown.Item action={handleLogout}>{t('Выйти')}</Dropdown.Item>
    </Dropdown>
  );
});

UserBarMenu.displayName = 'UserBarMenu';
