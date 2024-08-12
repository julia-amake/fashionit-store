import React, { memo } from 'react';
import { Auth, selectIsAuth } from 'src/features/Auth';
import { useAppSelector } from 'src/shared/lib/hooks/redux';
import { UserBarMenu } from '../UserBarMenu/UserBarMenu';

export const UserBar = memo(() => {
  const isAuth = useAppSelector(selectIsAuth);

  return (
    <>
      {isAuth && <UserBarMenu />}
      {!isAuth && <Auth />}
    </>
  );
});

UserBar.displayName = 'UserBar';
