import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './i18n/locales/en';
import ko from './i18n/locales/ko';
import jp from './i18n/locales/jp';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en,
      },
      ko: {
        translation: ko,
      },
      jp: {
        translation: jp,
      },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
