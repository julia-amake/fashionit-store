import React, { FC, Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'src/shared/config/i18n/i18nForTests';
import { Preloader } from 'src/shared/ui/Preloader';
import { TranslationsProvider } from '../../providers';

export const TranslationsDecorator = (Story: FC) => {
  return (
    <Suspense fallback={<Preloader />}>
      <I18nextProvider i18n={i18n}>
        <TranslationsProvider>
          <Story />
        </TranslationsProvider>
      </I18nextProvider>
    </Suspense>
  );
};
