export const isObjContainsValue = (obj: Record<string, unknown>, value: unknown): boolean =>
  Object.values(obj).includes(value);
