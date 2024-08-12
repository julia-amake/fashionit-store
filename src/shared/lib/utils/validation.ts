export const getTouchedError = (
  submitCount: number,
  error?: string,
  touched?: boolean
): string | null => (submitCount && error && touched ? error : null);

export const isNotDefinedString = (string?: string): boolean => !string?.trim();
