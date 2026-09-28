import React, { createContext, useContext, ReactNode } from 'react';
import en from './en';
import lg from './lg';
import sw from './sw';
import { Locale, TranslationKeys } from './types';
import { useSettingsStore } from '../store/settings';

export const LOCALES: Locale[] = ['en', 'lg', 'sw'];
export const LOCALE_FLAGS: Record<Locale, string> = {
  en: '🇬🇧',
  lg: '🇺🇬',
  sw: '🇰🇪',
};

const translations: Record<Locale, TranslationKeys> = { en, lg, sw };

type I18nContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: TranslationKeys;
};

const I18nContext = createContext<I18nContextValue>({
  locale: 'en',
  setLocale: () => {},
  t: en,
});

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const locale = useSettingsStore((s) => s.locale);
  const setLocale = useSettingsStore((s) => s.setLocale);

  const value: I18nContextValue = {
    locale,
    setLocale,
    t: translations[locale],
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = (): I18nContextValue => useContext(I18nContext);

export { translations };
export type { Locale, TranslationKeys };