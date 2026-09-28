import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Screen } from '../components/Screen';
import { useTheme } from '../theme';
import { useI18n } from '../i18n';
import { formatShs } from '../utils/format';

type Tab = 'owedToMe' | 'iOwe';

export default function DebtsScreen() {
  const theme = useTheme();
  const t = useI18n().t;
  const [tab, setTab] = useState<Tab>('owedToMe');

  return (
    <Screen>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <View style={styles.tabs}>
          {(['owedToMe', 'iOwe'] as const).map((key) => {
            const active = tab === key;
            return (
              <Pressable
                key={key}
                onPress={() => setTab(key)}
                style={[
                  styles.tab,
                  { backgroundColor: active ? theme.gold : theme.surface, borderColor: theme.line },
                ]}
              >
                <Text
                  style={[
                    styles.tabText,
                    { color: active ? '#fff' : theme.textSecondary, fontWeight: active ? '700' : '400' },
                  ]}
                >
                  {t[key]}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={[styles.empty, { borderColor: theme.line }]}>
          <Text style={[styles.emptyText, { color: theme.textSecondary }]}>{t.noDebts}</Text>
          <Text style={[styles.emptyHint, { color: theme.textSecondary }]}>{formatShs(0)}</Text>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { padding: 16, gap: 16 },
  tabs: { flexDirection: 'row', gap: 8 },
  tab: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
  },
  tabText: { fontSize: 14 },
  empty: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 12,
    padding: 28,
    alignItems: 'center',
  },
  emptyText: { fontSize: 15, marginBottom: 4 },
  emptyHint: { fontSize: 20, fontWeight: '600' },
});