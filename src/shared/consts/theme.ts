export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export type Theme = KeyValueOfInterface<typeof THEME>;
