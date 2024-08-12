import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useModal } from '../../lib/hooks/useModal';
import { Button } from '../Button';
import { Heading } from '../Heading';
import { Modal } from '../Modal';
import { Text } from '../Text/Text';
import s from './Confirmation.module.scss';

interface ConfirmationProps {
  visible?: boolean;
  title: string | string[];
  desc?: string | string[];
  cancelText?: string;
  confirmText?: string;
  disabled?: boolean;
  onConfirm: () => void;
  onCancel?: () => void;
}

export const Confirmation = ({
  visible = true,
  title,
  desc,
  cancelText,
  confirmText,
  disabled,
  onConfirm,
  onCancel,
}: ConfirmationProps) => {
  const { isOpen, close } = useModal(visible);
  const { t } = useTranslation();

  const handleCancel = useCallback(() => {
    onCancel?.();
    close();
  }, [close, onCancel]);

  return (
    <Modal visible={isOpen} onClose={handleCancel}>
      <div className={s.content}>
        <Heading size="h6">{title}</Heading>
        {desc && <Text>{desc}</Text>}
        <div className={s.buttons}>
          <Button size="s" variant="secondary" onClick={handleCancel}>
            {cancelText || t('Отменить')}
          </Button>
          <Button size="s" disabled={disabled} onClick={onConfirm}>
            {confirmText || t('Подтвердить')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
