import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Importing translation files
import enTranslations from './locales/en/translation.json';
import esTranslations from './locales/es/translation.json';

const resources = {
  en: {
    translation: enTranslations
  },
  es: {
    translation: esTranslations
  }
};

i18n
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // Default language
    fallbackLng: "en", // Fallback language if the desired language is not available
    interpolation: {
      escapeValue: false // React already does escaping
    }
  });

export default i18n;
