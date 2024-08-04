import * as i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import { LANGUAGES } from 'src/shared/consts/langs';

i18n
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
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  });

export default i18n;
