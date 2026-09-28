export type TxInput = {
  type: 'in' | 'out';
  amount: number;
};

export type Balance = {
  income: number;
  expenses: number;
  net: number;
  current: number;
};

export const emptyBalance: Balance = { income: 0, expenses: 0, net: 0, current: 0 };

/**
 * Pure, side-effect-free balance computation from a list of transaction inputs.
 * net === income - expenses (i.e. expenses stored as positive magnitudes).
 * current === running balance (income - expenses).
 */
export function computeBalance(txs: TxInput[]): Balance {
  let income = 0;
  let expenses = 0;
  for (const tx of txs) {
    if (tx.type === 'in') {
      income += tx.amount;
    } else {
      expenses += tx.amount;
    }
  }
  const net = income - expenses;
  return { income, expenses, net, current: net };
}

export type CategoryTotals = { inPerCategory: Record<string, number>; outPerCategory: Record<string, number> };

/** Aggregates amounts grouped by category id, split by direction. */
export function totalsByCategory(txs: Array<TxInput & { categoryId: string | null }>): CategoryTotals {
  const inPerCategory: Record<string, number> = {};
  const outPerCategory: Record<string, number> = {};
  for (const tx of txs) {
    const key = tx.categoryId ?? 'uncategorized';
    const bucket = tx.type === 'in' ? inPerCategory : outPerCategory;
    bucket[key] = (bucket[key] ?? 0) + tx.amount;
  }
  return { inPerCategory, outPerCategory };
}

/**
 * Day-grouped view for list rendering. Keys are "YYYY-MM-DD"; items sorted oldest→newest per day.
 */
export function groupByDay(txs: Array<TxInput & { id: string; timestamp: Date }>): {
  day: string;
  items: Array<TxInput & { id: string; timestamp: Date }>;
}[] {
  const grouped = new Map<string, { day: string; items: Array<TxInput & { id: string; timestamp: Date }> }>();
  for (const tx of txs) {
    const key = localDayKey(tx.timestamp);
    const entry = grouped.get(key);
    if (entry) {
      entry.items.push(tx);
    } else {
      grouped.set(key, { day: key, items: [tx] });
    }
  }
  return Array.from(grouped.values()).sort((a, b) => (a.day < b.day ? 1 : a.day > b.day ? -1 : 0));
}

export function localDayKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}