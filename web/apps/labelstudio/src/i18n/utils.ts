export const DEFAULT_LOCALE = 'en-US';
export const SUPPORTED_LOCALES = ['en-US', 'zh-CN'];

export function getBrowserLocale(): string {
  const lang = navigator.language || (navigator as any).userLanguage;
  return lang.startsWith('zh') ? 'zh-CN' : DEFAULT_LOCALE;
}

export function isValidLocale(locale: string): boolean {
  return SUPPORTED_LOCALES.includes(locale);
}

export async function loadLocaleMessages(locale: string) {
  return (await import(`./${locale}.json`)).default;
}
