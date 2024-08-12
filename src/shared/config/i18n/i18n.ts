import * as i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import { LANGUAGES } from '../../consts/langs';

void i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: LANGUAGES.RU.SHORT,
    supportedLngs: [LANGUAGES.RU.SHORT, LANGUAGES.EN.SHORT],
    debug: false,
    returnNull: false,

    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: __IS_DEV__ ? '/locales/{{lng}}/{{ns}}.json' : 'locales/{{lng}}/{{ns}}.json',
    },
  });

export default i18n;
