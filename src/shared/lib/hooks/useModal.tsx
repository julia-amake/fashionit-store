import { useCallback, useMemo, useState } from 'react';

interface UseModalResult {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useModal = (opened = false): UseModalResult => {
  const [isOpen, setIsOpen] = useState(opened);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return useMemo(
    () => ({
      isOpen,
      open,
      close,
    }),
    [isOpen, open, close]
  );
};
