import React from 'react';
import ReactDOM from 'react-dom/client';
import 'src/app/styles/index.scss';
import 'src/shared/config/i18n/i18n';
import { Provider } from 'react-redux';
import { ThemeProvider, TranslationsProvider } from 'src/app/providers';
import { AppRouter } from 'src/app/routing/ui/AppRouter';
import { store } from 'src/app/store/store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <TranslationsProvider>
        <ThemeProvider>
          <AppRouter />
        </ThemeProvider>
      </TranslationsProvider>
    </Provider>
  </React.StrictMode>
);
