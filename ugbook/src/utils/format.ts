const FMT = new Intl.NumberFormat('en-UG');

export const formatShs = (value: number): string => {
  const safe = Number.isFinite(value) ? Math.round(Math.abs(value)) : 0;
  return `Shs ${FMT.format(safe)}`;
};

export const formatShsSigned = (value: number): string => {
  const sign = value < 0 ? '-' : '';
  return `${sign}${formatShs(value)}`;
};

export const formatMonthYear = (date: Date): string =>
  `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;

export const formatDay = (date: Date): string =>
  date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

export const formatTime = (date: Date): string =>
  date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

// Uganda fiscal year runs July 1 – June 30.
// taxYear = start year of the fiscal year containing `timestamp` (e.g. 2025 => FY 2025/26)
export const taxYearFor = (timestamp: Date): number => {
  const month = timestamp.getMonth() + 1; // 1-12
  const year = timestamp.getFullYear();
  return month >= 7 ? year : year - 1;
};

export const taxYearLabel = (taxYear: number): string => `${taxYear}/${String(taxYear + 1).slice(2)}`;