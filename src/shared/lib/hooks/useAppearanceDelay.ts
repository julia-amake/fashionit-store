import { useEffect, useRef, useState } from 'react';

interface AppearanceDelayOptions {
  defaultValue?: boolean;
  appearanceDelay?: number;
  minDisplay?: number;
}

export const useAppearanceDelay = (
  show?: boolean,
  { minDisplay = 500, defaultValue = false, appearanceDelay = 500 }: AppearanceDelayOptions = {}
) => {
  const [shown, setShown] = useState(defaultValue);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(
      () => {
        setShown(!!show);
      },
      show ? appearanceDelay : minDisplay
    );

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [appearanceDelay, minDisplay, show]);

  return shown;
};
