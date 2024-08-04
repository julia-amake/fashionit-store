export const LANGUAGES = {
  RU: {
    SHORT: 'ru',
    SHORT_UPPER: 'RU',
    LONG: 'русский',
    LONG_CAP: 'Русский',
  },
  EN: {
    SHORT: 'en',
    SHORT_UPPER: 'EN',
    LONG: 'english',
    LONG_CAP: 'English',
  },
} as const;

export type Language = typeof LANGUAGES.RU.SHORT | typeof LANGUAGES.EN.SHORT;
