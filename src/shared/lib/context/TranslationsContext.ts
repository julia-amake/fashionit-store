import { createContext } from 'react';
import type { i18n } from 'i18next';
import i18next from 'i18next';
import { Language } from '../../consts/langs';

export interface TranslationsContextType extends Omit<i18n, 'changeLanguage'> {
  changeLanguage: (lang: Language) => void;
}

export const TranslationsContext = createContext<TranslationsContextType>(i18next);
