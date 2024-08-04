import React, { memo, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useModal } from 'src/shared/lib/hooks';
import { Button } from 'src/shared/ui/Button';
import { Heading } from 'src/shared/ui/Heading';
import { Modal } from 'src/shared/ui/Modal';
import { Text } from 'src/shared/ui/Text';
import s from 'src/features/Category/ui/DeleteCategory/DeleteCategory.module.scss';

interface ConfirmModalProps {
  title: string | string[];
  desc?: string | string[];
  cancelText?: string;
  confirmText?: string;
  disabled?: boolean;
  onConfirm: () => void;
  button: (onOpen: () => void) => ReactElement;
}

export const ConfirmModal = memo(
  ({
    button,
    title,
    desc,
    cancelText = 'Отменить',
    confirmText = 'Подтвердить',
    disabled,
    onConfirm,
  }: ConfirmModalProps) => {
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
              <Button label={t(cancelText)} size="s" variant="secondary" onClick={close} />
              <Button label={t(confirmText)} size="s" disabled={disabled} onClick={onConfirm} />
            </div>
          </div>
        </Modal>
      </>
    );
  }
);

ConfirmModal.displayName = 'ConfirmModal';
