import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, getBrowserLocale, isValidLocale } from './utils';
import enUS from './en-US.json';
import zhCN from './zh-CN.json';

const initLocale = () => {
  const storageLocale = localStorage.getItem('ls-locale');
  if (storageLocale && isValidLocale(storageLocale)) return storageLocale;
  return getBrowserLocale();
};

async function setupI18n() {
  const lng = initLocale();
  const resources = {
    'en-US': { translation: enUS },
    'zh-CN': { translation: zhCN },
  };

  await i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
      resources,
      lng,
      fallbackLng: DEFAULT_LOCALE,
      interpolation: { escapeValue: false },
      detection: {
        order: ['localStorage', 'navigator'],
        lookupLocalStorage: 'ls-locale'
      }
    });
}

export async function setLocale(locale: string) {
  if (!isValidLocale(locale)) return;
  await i18n.changeLanguage(locale);
  localStorage.setItem('ls-locale', locale);
}

export default setupI18n;
