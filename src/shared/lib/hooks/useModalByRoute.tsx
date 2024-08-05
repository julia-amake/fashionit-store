import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useModalByRoute = (path: string) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(pathname === path);

    return () => setIsVisible(false);
  }, [path, pathname]);

  const close = useCallback(() => navigate(-1), [navigate]);

  const open = useCallback(() => {
    navigate(path);
  }, [navigate, path]);

  return useMemo(() => ({ isVisible, open, close }), [close, isVisible, open]);
};
