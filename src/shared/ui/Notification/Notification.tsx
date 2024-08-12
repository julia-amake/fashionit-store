import React, { memo, ReactNode, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useModal } from 'src/shared/lib/hooks/useModal';
import { Button } from 'src/shared/ui/Button';
import { Heading } from 'src/shared/ui/Heading';
import { Modal } from 'src/shared/ui/Modal';
import { Text } from 'src/shared/ui/Text/Text';
import s from './Notification.module.scss';

interface NotificationProps {
  visible?: boolean;
  title?: string | string[];
  info: ReactNode;
  onClose?: () => void;
  closeBtnText?: string | string[];
}

export const Notification = memo(
  ({ visible = true, title, info, onClose, closeBtnText }: NotificationProps) => {
    const { isOpen, close } = useModal(visible);
    const { t } = useTranslation();

    const handleClose = useCallback(() => {
      onClose?.();
      close();
    }, [close, onClose]);

    return (
      <Modal visible={isOpen} onClose={close}>
        <div className={s.content}>
          {title && <Heading size="h6">{title}</Heading>}
          <Text>{info}</Text>
          <Button className={s.btn} size="s" onClick={handleClose}>
            {closeBtnText ? closeBtnText : t('Закрыть')}
          </Button>
        </div>
      </Modal>
    );
  }
);

Notification.displayName = 'Notification';
