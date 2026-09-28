import { Database } from '@nozbe/watermelondb';
import LokiJSAdapter from '@nozbe/watermelondb/adapters/lokijs';
import { schema } from './schema';
import { Transaction, Category, Debt, SyncLog } from './models';

export const makeTestDatabase = (dbName = 'test'): Database => {
  const adapter = new LokiJSAdapter({
    schema,
    dbName: `test-${dbName}-${Date.now()}`,
    useWebWorker: false,
    useIncrementalIndexedDB: false,
  });
  return new Database({
    adapter,
    modelClasses: [Transaction, Category, Debt, SyncLog],
  });
};