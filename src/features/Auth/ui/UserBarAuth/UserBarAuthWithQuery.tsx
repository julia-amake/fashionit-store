import React, { memo, useCallback, useEffect, useState } from 'react';
import cn from 'clsx';
import { useTranslation } from 'react-i18next';
import { LOCAL_STORAGE_TOKEN_KEY } from 'src/shared/consts/localStorage';
import { useAppDispatch } from 'src/shared/lib/hooks/redux';
import { Button } from 'src/shared/ui/Button';
import { Modal } from 'src/shared/ui/Modal';
import { useUserBarAuthWithQuery } from '../../lib/hooks/useUserBarAuthWithQuery';
import { login } from '../../model/slices/userSlice';
import { AuthForm } from '../AuthForm';
import s from './UserBarAuth.module.scss';

export type UserBarAuthMode = 'signIn' | 'signUp';

interface UserBarAuthProps {
  className?: string;
}

export const UserBarAuthWithQuery = memo(({ className }: UserBarAuthProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<UserBarAuthMode>('signIn');
  const isSingInMode = mode === 'signIn';
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    const userToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    if (!userToken) return;
    dispatch(login(userToken));
  }, [dispatch]);

  useEffect(() => {
    return () => setIsOpen(false);
  }, []);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const formManager = useUserBarAuthWithQuery(mode, handleClose);

  const { setErrors, initialErrors, setStatus, initialStatus } = formManager;

  const handleToggleMode = useCallback(() => {
    setMode(isSingInMode ? 'signUp' : 'signIn');
    setErrors(initialErrors);
    setStatus(initialStatus);
  }, [initialErrors, initialStatus, isSingInMode, setErrors, setStatus]);

  return (
    <div className={cn(s.outer, className)}>
      <Button className={s.link} variant="clean" onClick={handleOpen}>
        {t('Войти')}
      </Button>
      <Modal visible={isOpen} onClose={handleClose}>
        <AuthForm title={isSingInMode ? t('Вход') : t('Регистрация')} formManager={formManager} />
        <div className={s.footer}>
          {isSingInMode ? t('Еще нет аккаунта?') : t('Уже есть аккаунт?')}
          <Button className={s.btn} variant="clean" size="s" onClick={handleToggleMode}>
            {isSingInMode ? t('Зарегистрироваться') : t('Войти')}
          </Button>
        </div>
      </Modal>
    </div>
  );
});

UserBarAuthWithQuery.displayName = 'UserBarAuthWithQuery';
