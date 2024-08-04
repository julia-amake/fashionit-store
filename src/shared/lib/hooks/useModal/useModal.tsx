import { useMemo, useState } from 'react';

interface useModalResult {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useModal = (open = false): useModalResult => {
  const [isOpen, setIsOpen] = useState(open);

  return useMemo(
    () => ({
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }),
    [isOpen]
  );
};
