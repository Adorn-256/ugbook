import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Screen } from '../components/Screen';
import { useTheme } from '../theme';
import { useI18n } from '../i18n';
import { formatShs } from '../utils/format';

export default function TransactionsScreen() {
  const theme = useTheme();
  const t = useI18n().t;

  return (
    <Screen>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <View style={[styles.balanceCard, { backgroundColor: theme.surface, borderColor: theme.line }]}>
          <Text style={[styles.label, { color: theme.textSecondary }]}>{t.runningBalance}</Text>
          <Text style={[styles.balance, { color: theme.green }]}>{formatShs(0)}</Text>
          <View style={styles.split}>
            <View>
              <Text style={[styles.splitLabel, { color: theme.textSecondary }]}>{t.moneyIn}</Text>
              <Text style={[styles.splitValue, { color: theme.green }]}>{formatShs(0)}</Text>
            </View>
            <View>
              <Text style={[styles.splitLabel, { color: theme.textSecondary }]}>{t.moneyOut}</Text>
              <Text style={[styles.splitValue, { color: theme.red }]}>{formatShs(0)}</Text>
            </View>
          </View>
        </View>

        <View style={[styles.empty, { borderColor: theme.line }]}>
          <Text style={[styles.emptyText, { color: theme.textSecondary }]}>{t.noTransactions}</Text>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { padding: 16, gap: 16 },
  balanceCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
  },
  label: { fontSize: 14, marginBottom: 4 },
  balance: { fontSize: 36, fontWeight: '700', marginBottom: 16 },
  split: { flexDirection: 'row', justifyContent: 'space-between' },
  splitLabel: { fontSize: 13, marginBottom: 2 },
  splitValue: { fontSize: 18, fontWeight: '600' },
  empty: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 12,
    padding: 28,
    alignItems: 'center',
  },
  emptyText: { fontSize: 15 },
});