import { useLayoutEffect, useState } from 'react';

type UseImageLoadingResult = [isLoading: boolean, isError: boolean];

export const useImageLoading = (src: string): UseImageLoadingResult => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useLayoutEffect(() => {
    const img = new Image();

    img.src = src;
    img.onload = () => {
      setIsLoading(false);
      setIsError(false);
    };
    img.onerror = () => {
      setIsLoading(false);
      setIsError(true);
    };
  }, [src]);

  return [isLoading, isError];
};
