import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Screen } from '../components/Screen';
import { useTheme } from '../theme';
import { useI18n } from '../i18n';
import { formatShs } from '../utils/format';

type Period = 'today' | 'thisWeek' | 'thisMonth';

export default function ReportsScreen() {
  const theme = useTheme();
  const t = useI18n().t;
  const [period, setPeriod] = useState<Period>('thisMonth');

  return (
    <Screen>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <View style={styles.chips}>
          {(['today', 'thisWeek', 'thisMonth'] as const).map((key) => {
            const active = period === key;
            return (
              <Pressable
                key={key}
                onPress={() => setPeriod(key)}
                style={[
                  styles.chip,
                  {
                    backgroundColor: active ? theme.gold : theme.surface,
                    borderColor: active ? theme.gold : theme.line,
                  },
                ]}
              >
                <Text
                  style={[styles.chipText, { color: active ? '#fff' : theme.textSecondary }]}
                >
                  {t[key]}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.line }]}>
          <Row label={t.totalIncome} value={formatShs(0)} color={theme.green} themeColor={theme.textSecondary} />
          <Row label={t.totalExpenses} value={formatShs(0)} color={theme.red} themeColor={theme.textSecondary} />
          <View style={[styles.divider, { backgroundColor: theme.line }]} />
          <Row label={t.netProfit} value={formatShs(0)} color={theme.gold} themeColor={theme.textSecondary} bold />
        </View>

        <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.line }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>{t.taxEstimate}</Text>
          <Text style={[styles.taxValue, { color: theme.gold }]}>{formatShs(0)}</Text>
          <Text style={[styles.disclaimer, { color: theme.textSecondary }]}>{t.taxDisclaimer}</Text>
        </View>
      </ScrollView>
    </Screen>
  );
}

function Row(props: {
  label: string;
  value: string;
  color: string;
  themeColor: string;
  bold?: boolean;
}) {
  return (
    <View style={styles.row}>
      <Text style={[styles.rowLabel, { color: props.themeColor }]}>{props.label}</Text>
      <Text
        style={[
          styles.rowValue,
          { color: props.color, fontWeight: props.bold ? '700' : '600' },
        ]}
      >
        {props.value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { padding: 16, gap: 16 },
  chips: { flexDirection: 'row', gap: 8 },
  chip: {
    flex: 1,
    borderRadius: 999,
    paddingVertical: 8,
    alignItems: 'center',
    borderWidth: 1,
  },
  chipText: { fontSize: 13 },
  card: { borderRadius: 16, borderWidth: 1, padding: 16, gap: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  rowLabel: { fontSize: 14 },
  rowValue: { fontSize: 17 },
  divider: { height: StyleSheet.hairlineWidth, marginVertical: 2 },
  sectionTitle: { fontSize: 14, fontWeight: '600' },
  taxValue: { fontSize: 24, fontWeight: '700' },
  disclaimer: { fontSize: 12, lineHeight: 17 },
});