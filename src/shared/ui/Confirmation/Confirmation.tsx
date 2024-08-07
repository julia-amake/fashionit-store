import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useModal } from '../../lib/hooks/useModal';
import { Button } from '../Button';
import { Heading } from '../Heading';
import { Modal } from '../Modal';
import { Text } from '../Text/Text';
import s from './Confirmation.module.scss';

interface ConfirmationProps {
  title: string | string[];
  desc?: string | string[];
  cancelText?: string;
  confirmText?: string;
  disabled?: boolean;
  onConfirm: () => void;
  button: (onOpen: () => void) => ReactElement;
}

export const Confirmation = ({
  button,
  title,
  desc,
  cancelText = 'Отменить',
  confirmText = 'Подтвердить',
  disabled,
  onConfirm,
}: ConfirmationProps) => {
  const { isOpen, open, close } = useModal();
  const { t } = useTranslation();

  return (
    <>
      {button(open)}
      <Modal visible={isOpen} onClose={close}>
        <div className={s.content}>
          <Heading size="h6">{t(title)}</Heading>
          {desc && <Text>{t(desc)}</Text>}
          <div className={s.buttons}>
            <Button size="s" variant="secondary" onClick={close}>
              {t(cancelText)}
            </Button>
            <Button size="s" disabled={disabled} onClick={onConfirm}>
              {t(confirmText)}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
