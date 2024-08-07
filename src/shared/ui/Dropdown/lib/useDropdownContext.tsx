import { createContext, useCallback, useMemo, useState } from 'react';

interface DropdownContext {
  isOpen: boolean;
  open?: () => void;
  close?: () => void;
}

export const DropdownContext = createContext<DropdownContext>({ isOpen: false });

export const useDropdownContext = (): Required<DropdownContext> => {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return useMemo(
    () => ({
      isOpen,
      open,
      close,
    }),
    [close, isOpen, open]
  );
};
