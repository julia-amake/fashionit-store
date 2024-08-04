import { useEffect } from 'react';
import { BODY_MODAL_OPENED_CLASSNAME } from 'src/shared/consts/ui';

export const usePreventPageScrolling = (isPrevent: boolean) => {
  useEffect(() => {
    if (isPrevent) {
      document.body.classList.add(BODY_MODAL_OPENED_CLASSNAME);
      return;
    }
    document.body.classList.remove(BODY_MODAL_OPENED_CLASSNAME);
  }, [isPrevent]);

  useEffect(() => {
    return () => {
      document.body.classList.remove(BODY_MODAL_OPENED_CLASSNAME);
    };
  }, []);
};
