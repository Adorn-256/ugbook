import React from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { Screen } from '../components/Screen';
import { useSettingsStore } from '../store/settings';
import type { ThemeMode } from '../store/settings';
import { FONT_SCALES, FONT_SCALE_LABELS } from '../theme';
import { useTheme } from '../theme';
import { LOCALES, LOCALE_FLAGS, useI18n } from '../i18n';
import type { Locale } from '../i18n';

export default function SettingsScreen() {
  const theme = useTheme();
  const { t } = useI18n();

  const locale = useSettingsStore((s) => s.locale);
  const setLocale = useSettingsStore((s) => s.setLocale);
  const themeMode = useSettingsStore((s) => s.theme);
  const setThemeMode = useSettingsStore((s) => s.setTheme);
  const fontScale = useSettingsStore((s) => s.fontScale);
  const setFontScale = useSettingsStore((s) => s.setFontScale);
  const voiceEnabled = useSettingsStore((s) => s.voiceEnabled);
  const setVoiceEnabled = useSettingsStore((s) => s.setVoiceEnabled);

  const themeModes: { key: ThemeMode; label: string }[] = [
    { key: 'system', label: 'System' },
    { key: 'light', label: 'Light' },
    { key: 'dark', label: 'Dark' },
    { key: 'high-contrast', label: t.highContrast },
  ];

  return (
    <Screen>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <Section title={t.language}>
          {LOCALES.map((l: Locale) => (
            <Choice
              key={l}
              label={`${LOCALE_FLAGS[l]}  ${l.toUpperCase()}`}
              active={locale === l}
              onPress={() => setLocale(l)}
              theme={theme}
            />
          ))}
        </Section>

        <Section title={t.fontSize}>
          {FONT_SCALES.map((s) => (
            <Choice
              key={s}
              label={`${FONT_SCALE_LABELS[s]} (${s}x)`}
              active={fontScale === s}
              onPress={() => setFontScale(s)}
              theme={theme}
            />
          ))}
        </Section>

        <Section title={t.highContrast}>
          {themeModes.map((m) => (
            <Choice
              key={m.key}
              label={m.label}
              active={themeMode === m.key}
              onPress={() => setThemeMode(m.key)}
              theme={theme}
            />
          ))}
        </Section>

        <Section title={t.voice}>
          <View style={[styles.row, { borderColor: theme.line }]}>
            <Text style={{ color: theme.text }}>{t.voice}</Text>
            <Switch
              value={voiceEnabled}
              onValueChange={setVoiceEnabled}
              thumbColor={voiceEnabled ? theme.gold : theme.tabInactive}
            />
          </View>
        </Section>
      </ScrollView>
    </Screen>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const theme = useTheme();
  return (
    <View style={[styles.section, { backgroundColor: theme.surface, borderColor: theme.line }]}>
      <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>{title}</Text>
      {children}
    </View>
  );
}

function Choice(props: {
  label: string;
  active: boolean;
  onPress: () => void;
  theme: ReturnType<typeof useTheme>;
}) {
  return (
    <Pressable
      onPress={props.onPress}
      style={[
        styles.choice,
        { borderColor: props.active ? props.theme.gold : props.theme.line },
        { backgroundColor: props.active ? props.theme.gold + '1A' : 'transparent' },
      ]}
    >
      <Text style={{ color: props.active ? props.theme.gold : props.theme.text, fontWeight: props.active ? '700' : '400' }}>
        {props.label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { padding: 16, gap: 16 },
  section: { borderRadius: 16, borderWidth: 1, padding: 16, gap: 10 },
  sectionTitle: { fontSize: 13, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 },
  choice: {
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
});