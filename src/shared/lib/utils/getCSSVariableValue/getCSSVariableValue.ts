export const getCSSVariableValue = (elem: HTMLElement, prop: `--${string}`): string => {
  return getComputedStyle(elem).getPropertyValue(prop);
};
