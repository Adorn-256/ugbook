import { useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { useSettingsStore } from '../store/settings';

export type AppTheme = 'light' | 'dark' | 'high-contrast';

export const semantic = {
  green: '#2E7D32', // money in — Ugandan market green
  red: '#C62828',   // money out
  gold: '#C99A2D',  // Ugandan coat-of-arms yellow
  ink: '#1F1F1F',
  paper: '#FFFDF7',
  white: '#FFFFFF',
  muted: '#6B6B6B',
  line: '#DDD7CC',
};

export const makeTheme = (mode: AppTheme) => {
  const dark = mode === 'dark';
  const contrast = mode === 'high-contrast';
  return {
    mode,
    background: contrast ? '#000000' : dark ? '#121212' : semantic.paper,
    surface: contrast ? '#000000' : dark ? '#1E1E1E' : semantic.white,
    text: contrast ? '#FFFFFF' : dark ? '#ECECEC' : semantic.ink,
    textOnSurface: contrast ? '#FFFFFF' : dark ? '#ECECEC' : semantic.ink,
    textSecondary: contrast ? '#FFFFFF' : dark ? '#9E9E9E' : semantic.muted,
    line: contrast ? '#FFFFFF' : dark ? '#333' : semantic.line,
    green: semantic.green,
    red: semantic.red,
    gold: semantic.gold,
    tabInactive: contrast ? '#AAAAAA' : dark ? '#8E8E8E' : semantic.muted,
  };
};

export const useTheme = () => {
  const system = useColorScheme();
  const mode = useSettingsStore((s) => s.theme);
  const resolved = mode === 'system' ? (system === 'dark' ? 'dark' : 'light') : mode;
  return useMemo(() => makeTheme(resolved), [resolved]);
};

export type Theme = ReturnType<typeof makeTheme>;