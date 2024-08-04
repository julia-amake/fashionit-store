import React, { memo, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

interface CroppedTextProps {
  rows: number;
  opened: boolean;
  children: string;
  className?: string;
}

const calcMiddle = (start: number, end: number) => Math.floor((start + end) / 2);
const getTestText = (text: string, indexTo: number) => text.slice(0, indexTo).trimEnd() + '…';

const INITIAL_VALUE = 'Ш';

export const CroppedText = memo(({ rows, opened, children, className }: CroppedTextProps) => {
  const [croppedText, setCroppedText] = useState<string>(INITIAL_VALUE);
  const lineHeight = useRef(0);

  const elem = useRef<HTMLDivElement>(null);
  const start = useRef(0);
  const end = useRef(children.length);
  const middle = useRef(calcMiddle(start.current, end.current));

  const reset = useCallback(() => {
    start.current = 0;
    end.current = children.length;
    middle.current = calcMiddle(start.current, end.current);
    setCroppedText(getTestText(children, middle.current));
  }, [children]);

  useLayoutEffect(() => {
    if (!elem.current) return;
    lineHeight.current = elem.current.getBoundingClientRect().height;
  }, []);

  useEffect(() => {
    reset();
  }, [reset, rows, children, opened]);

  useLayoutEffect(() => {
    if (!elem.current || !children || end.current < start.current || croppedText === INITIAL_VALUE)
      return;

    const currHeight = elem.current.getBoundingClientRect().height;

    if (currHeight <= lineHeight.current * rows) {
      if (children.trimEnd().length === middle.current) {
        setCroppedText(children);
        end.current = -1;
        return;
      }

      start.current = middle.current + 1;
      middle.current = calcMiddle(start.current, end.current);
      setCroppedText(getTestText(children, middle.current));
      return;
    }
    end.current = middle.current - 1;
    middle.current = calcMiddle(start.current, end.current);
    setCroppedText(getTestText(children, middle.current));
    // eslint-disable-next-line
  }, [croppedText, opened]);

  useLayoutEffect(() => {
    const currElem = elem.current;
    if (!currElem) return;

    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach(() => {
        reset();
      });
    });

    resizeObserver.observe(currElem);

    return () => {
      currElem && resizeObserver.unobserve(currElem);
      reset();
    };
  }, [reset]);

  if (!children) return null;

  return (
    <div className={className} ref={elem}>
      {opened ? children : croppedText}
    </div>
  );
});

CroppedText.displayName = 'CroppedText';
