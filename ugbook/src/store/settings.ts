import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Locale } from '../i18n/types';
import { FontScale } from '../theme/typography';

export type ThemeMode = 'system' | 'light' | 'dark' | 'high-contrast';

type SettingsState = {
  locale: Locale;
  theme: ThemeMode;
  fontScale: FontScale;
  voiceEnabled: boolean;
  setLocale: (locale: Locale) => void;
  setTheme: (theme: ThemeMode) => void;
  setFontScale: (scale: FontScale) => void;
  setVoiceEnabled: (enabled: boolean) => void;
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      locale: 'en',
      theme: 'system',
      fontScale: 1,
      voiceEnabled: true,
      setLocale: (locale) => set({ locale }),
      setTheme: (theme) => set({ theme }),
      setFontScale: (fontScale) => set({ fontScale }),
      setVoiceEnabled: (voiceEnabled) => set({ voiceEnabled }),
    }),
    {
      name: 'my-money-settings',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);