import { useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useModalByRoute = (path: string) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isOpen = pathname === path;

  const open = useCallback(() => navigate(path), [navigate, path]);
  const close = useCallback(() => navigate(-1), [navigate]);

  return useMemo(
    () => ({
      isOpen,
      open,
      close,
    }),
    [close, isOpen, open]
  );
};
