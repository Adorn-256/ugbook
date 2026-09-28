import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { schema } from './schema';
import { Transaction, Category, Debt, SyncLog } from './models';

export const database = new Database({
  adapter: new SQLiteAdapter({
    schema,
    dbName: 'my-money',
    jsi: true,
    onSetUpError: (error) => {
      console.error('[WatermelonDB] Database setup failed:', error);
    },
  }),
  modelClasses: [Transaction, Category, Debt, SyncLog],
});