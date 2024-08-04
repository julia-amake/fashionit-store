import { useCallback, useEffect, useMemo, useReducer } from 'react';

interface CollapsedState {
  isOpen: boolean;
  isMounted: boolean;
}

export const CollapsedActionTypes = {
  COLLAPSED_OPEN: 'open',
  COLLAPSED_CLOSE: 'close',
  COLLAPSED_MOUNT: 'mount',
  COLLAPSED_UNMOUNT: 'unmount',
} as const;

interface CollapsedAction {
  type: KeyValueOfInterface<typeof CollapsedActionTypes>;
}

const statusesReducer = (state: CollapsedState, action: CollapsedAction): CollapsedState => {
  switch (action.type) {
    case CollapsedActionTypes.COLLAPSED_OPEN:
      return { ...state, isOpen: true };
    case CollapsedActionTypes.COLLAPSED_CLOSE:
      return { ...state, isOpen: false };
    case CollapsedActionTypes.COLLAPSED_MOUNT:
      return { ...state, isMounted: true };
    case CollapsedActionTypes.COLLAPSED_UNMOUNT:
      return { ...state, isMounted: false };
    default:
      throw new Error();
  }
};

interface Result {
  isOpen: boolean;
  isMounted: boolean;
  open: () => void;
  close: () => void;
  mount: () => void;
  unmount: () => void;
}

export const useCollapsedReducer = (elem: HTMLDivElement | null): Result => {
  const [statuses, dispatch] = useReducer(statusesReducer, {
    isOpen: false,
    isMounted: false,
  });
  const { isOpen, isMounted } = statuses;

  const setStyle = useCallback(() => {
    if (!elem || !isOpen) return;
    elem.style.height = `${elem.scrollHeight}px`;
  }, [elem, isOpen]);

  useEffect(() => {
    if (!elem) return;

    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach(setStyle);
    });

    resizeObserver.observe(elem);

    return () => resizeObserver.unobserve(elem);
  }, [elem, setStyle]);

  const open = useCallback(() => {
    setStyle();
    dispatch({ type: CollapsedActionTypes.COLLAPSED_OPEN });
  }, [setStyle]);

  const close = useCallback(() => {
    if (!elem) return;
    dispatch({ type: CollapsedActionTypes.COLLAPSED_CLOSE });
    elem.style.height = '0';
  }, [elem]);

  const mount = useCallback(() => dispatch({ type: CollapsedActionTypes.COLLAPSED_MOUNT }), []);
  const unmount = useCallback(() => dispatch({ type: CollapsedActionTypes.COLLAPSED_UNMOUNT }), []);

  return useMemo(
    () => ({ isOpen, isMounted, open, close, mount, unmount }),
    [open, close, mount, unmount, isMounted, isOpen]
  );
};
