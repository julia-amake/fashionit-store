export const containsValue = (obj: Record<string, unknown>, value: unknown): boolean =>
  Object.values(obj).includes(value);
