import { formatShs, formatShsSigned, taxYearFor, taxYearLabel, formatMonthYear } from './format';

describe('formatShs', () => {
  it('formats with Shs prefix and thousands separators', () => {
    expect(formatShs(0)).toBe('Shs 0');
    expect(formatShs(1500000)).toBe('Shs 1,500,000');
    expect(formatShs(1234567)).toBe('Shs 1,234,567');
  });

  it('ignores sign and rounds', () => {
    expect(formatShs(-5000)).toBe('Shs 5,000');
    expect(formatShs(1499.6)).toBe('Shs 1,500');
  });
});

describe('formatShsSigned', () => {
  it('prepends minus for negatives', () => {
    expect(formatShsSigned(-10000)).toBe('-Shs 10,000');
    expect(formatShsSigned(10000)).toBe('Shs 10,000');
  });
});

describe('taxYearFor (Uganda fiscal year Jul–Jun)', () => {
  it('maps months Jan–Jun to previous calendar year', () => {
    expect(taxYearFor(new Date(2026, 0, 15))).toBe(2025); // Jan 2026 -> FY 2025/26
    expect(taxYearFor(new Date(2026, 5, 30))).toBe(2025); // Jun 2026 -> FY 2025/26
  });

  it('maps months Jul–Dec to current calendar year', () => {
    expect(taxYearFor(new Date(2025, 6, 1))).toBe(2025); // Jul 2025 -> FY 2025/26
    expect(taxYearFor(new Date(2025, 11, 31))).toBe(2025); // Dec 2025 -> FY 2025/26
  });

  it('crosses the July boundary correctly', () => {
    expect(taxYearFor(new Date(2026, 6, 1))).toBe(2026); // Jul 2026 -> FY 2026/27
  });
});

describe('taxYearLabel', () => {
  it('renders FY label', () => {
    expect(taxYearLabel(2025)).toBe('2025/26');
  });
});

describe('formatMonthYear', () => {
  it('renders month year', () => {
    expect(formatMonthYear(new Date(2026, 5, 15))).toMatch(/Jun 2026/);
  });
});