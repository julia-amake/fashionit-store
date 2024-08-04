import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { LANGUAGES } from 'src/shared/consts/langs';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .init({
    fallbackLng: LANGUAGES.RU.SHORT,
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
