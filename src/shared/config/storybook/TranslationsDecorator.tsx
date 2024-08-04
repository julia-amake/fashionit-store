import 'src/app/styles/index.scss';
import React, { FC, Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';
import { TranslationsProvider } from 'src/app/providers';
import i18n from 'src/shared/config/i18n/i18nForTests';

export const TranslationsDecorator = (Story: FC) => {
  return (
    <Suspense fallback={<div>Загружаем языки...</div>}>
      <I18nextProvider i18n={i18n}>
        <TranslationsProvider>
          <Story />
        </TranslationsProvider>
      </I18nextProvider>
    </Suspense>
  );
};
