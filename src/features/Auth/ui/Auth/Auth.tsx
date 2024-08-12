import React, { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'src/shared/ui/Button';
import { Modal } from 'src/shared/ui/Modal';
import { useAuthFormManager } from '../../lib/hooks/useAuthFormManager';
import { AuthMode } from '../../model/types/authTypes';
import { AuthForm } from '../AuthForm';
import s from './Auth.module.scss';

interface AuthProps {
  className?: string;
}

export const Auth = memo(({ className }: AuthProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>('signIn');

  const { t } = useTranslation();

  const isSingInMode = mode === 'signIn';

  const handleOpen = useCallback(() => setIsOpen(true), []);
  const handleClose = useCallback(() => setIsOpen(false), []);

  const formManager = useAuthFormManager(mode, handleClose);
  const { setErrors, initialErrors, setStatus, initialStatus } = formManager;

  const handleToggleMode = useCallback(() => {
    setMode(isSingInMode ? 'signUp' : 'signIn');
    setErrors(initialErrors);
    setStatus(initialStatus);
  }, [initialErrors, initialStatus, isSingInMode, setErrors, setStatus]);

  useEffect(() => () => setIsOpen(false), []);

  return (
    <div className={className}>
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

Auth.displayName = 'UserBarAuthWithQuery';
