import React, { ReactNode, useCallback, useEffect, useMemo } from 'react';
import 'src/shared/config/i18n/i18n';
import { useTranslation } from 'react-i18next';
import { Language, LANGUAGES } from 'src/shared/consts/langs';
import { LOCAL_STORAGE_LANG_KEY } from 'src/shared/consts/localStorage';
import { TranslationsContext } from 'src/shared/lib/context';
import { TranslationsContextProps } from 'src/shared/lib/context/TranslationsContext';

interface TranslationsProviderProps {
  children: ReactNode;
  initialLang?: Language;
}

export const TranslationsProvider = ({
  initialLang = LANGUAGES.RU.SHORT,
  children,
}: TranslationsProviderProps) => {
  const { i18n } = useTranslation();

  const changeLanguage = useCallback(
    (language: Language) => {
      void i18n.changeLanguage(language);
      document.documentElement.lang = language;
      localStorage.setItem(LOCAL_STORAGE_LANG_KEY, language);
    },
    [i18n]
  );

  useEffect(() => {
    const storageLang = (localStorage.getItem(LOCAL_STORAGE_LANG_KEY) || '') as Language;
    const currLang = [LANGUAGES.RU.SHORT, LANGUAGES.EN.SHORT].includes(storageLang)
      ? storageLang
      : initialLang;
    changeLanguage(currLang);
  }, [changeLanguage, i18n, initialLang]);

  const translationsValue: TranslationsContextProps = useMemo(
    () => ({ ...i18n, changeLanguage }),
    // eslint-disable-next-line
    [changeLanguage, i18n, i18n.language]
  );

  return (
    <TranslationsContext.Provider value={translationsValue}>
      {children}
    </TranslationsContext.Provider>
  );
};
