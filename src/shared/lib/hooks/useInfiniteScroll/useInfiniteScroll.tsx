import { RefObject, useEffect, useRef, useState } from 'react';

interface useInfiniteScrollProps {
  triggerRef: RefObject<HTMLElement>;
  wrapperRef?: RefObject<HTMLElement>;
  action?: () => void;
}

export const useInfiniteScroll = ({
  triggerRef,
  wrapperRef,
  action,
}: useInfiniteScrollProps): {
  isVisible: boolean;
} => {
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const wrapperElement = wrapperRef?.current || null;
    const triggerElement = triggerRef.current;
    let observer = observerRef.current;

    if (!triggerElement) return;

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(
          (entry) => {
            if (entry.isIntersecting) {
              setIsVisible(entry.isIntersecting);
              action?.();
            }
          },
          { root: wrapperElement }
        );
      },
      { rootMargin: '100px' }
    );

    observer.observe(triggerElement);

    return () => observer?.disconnect();
  }, [action, triggerRef, wrapperRef]);

  return { isVisible };
};
