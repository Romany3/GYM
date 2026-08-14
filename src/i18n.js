import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslation from './locales/en.json';
import arTranslation from './locales/ar.json';

const resources = {
  en: { translation: enTranslation },
  ar: { translation: arTranslation },
};

const initialLang = localStorage.getItem('app_lang') || 'en';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: initialLang,
    fallbackLng: 'en',
    supportedLngs: ['en', 'ar'],
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

// Apply document attributes on language change
const applyDocAttributes = (lng) => {
  const currentLng = lng || i18n.language || 'en';
  document.documentElement.lang = currentLng;
  document.documentElement.dir = currentLng === 'ar' ? 'rtl' : 'ltr';
  localStorage.setItem('app_lang', currentLng);
};

applyDocAttributes(initialLang);

i18n.on('languageChanged', (lng) => {
  applyDocAttributes(lng);
});

export default i18n;
