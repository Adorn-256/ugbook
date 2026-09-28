import { makeTestDatabase } from './test-database';
import { Transaction, Debt, Category } from './models';

describe('WatermelonDB test database', () => {
  it('creates a transaction record and reads it back', async () => {
    const db = makeTestDatabase();
    let txId = '';
    await db.write(async () => {
      const cat = await db.get<Category>('categories').create((r) => {
        r.name = 'Stock';
        r.icon = 'package-variant';
        r.type = 'out';
      });
      const tx = await db.get<Transaction>('transactions').create((r) => {
        r.type = 'out';
        r.amount = 50000;
        r.category.set((c: any) => ({ id: cat.id } as any));
        r.note = 'Bought crates';
        r.timestamp = new Date(2026, 5, 10, 9, 0);
        r.taxYear = '2025';
      });
      txId = tx.id;
    });

    const found = await db.get<Transaction>('transactions').find(txId);
    expect(found.amount).toBe(50000);
    expect(found.type).toBe('out');
    expect(found.note).toBe('Bought crates');
    expect(found.taxYear).toBe('2025');
  });

  it('stores explicit boolean/optional values', async () => {
    const db = makeTestDatabase();
    let debtId = '';
    await db.write(async () => {
      const debt = await db.get<Debt>('debts').create((r) => {
        r.direction = 'owed_to_me';
        r.contactName = 'Mama Prossy';
        r.phone = null;
        r.photoUri = null;
        r.amount = 25000;
        r.dueDate = null;
        r.settled = false;
        r.timestamp = new Date(2026, 5, 11, 14, 0);
      });
      debtId = debt.id;
    });

    const found = await db.get<Debt>('debts').find(debtId);
    expect(found.settled).toBe(false);
    expect(found.contactName).toBe('Mama Prossy');
  });

  it('stores explicit boolean/optional values (debt roundtrip)', async () => {
    const db = makeTestDatabase();
    let debtId = '';
    await db.write(async () => {
      const debt = await db.get<Debt>('debts').create((r) => {
        r.direction = 'owed_to_me';
        r.contactName = 'Aunt Grace';
        r.phone = null;
        r.photoUri = null;
        r.amount = 40000;
        r.dueDate = null;
        r.settled = false;
        r.timestamp = new Date(2026, 5, 12, 10, 0);
      });
      debtId = debt.id;
    });

    const found = await db.get<Debt>('debts').find(debtId);
    expect(found.settled).toBe(false);
    expect(found.contactName).toBe('Aunt Grace');
  });
});