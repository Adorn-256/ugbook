import { Category } from './models';
import { database } from './database';

export type SeedCategory = {
  name: string;
  icon: string;
  type: 'in' | 'out' | 'both';
};

export const DEFAULT_CATEGORIES: SeedCategory[] = [
  { name: 'Stock', icon: 'package-variant', type: 'out' },
  { name: 'Transport', icon: 'truck-fast', type: 'out' },
  { name: 'Rent', icon: 'home', type: 'out' },
  { name: 'Fuel', icon: 'gas-station', type: 'out' },
  { name: 'Food', icon: 'food', type: 'both' },
  { name: 'Other', icon: 'dots-horizontal-circle', type: 'both' },
];

export const seedCategories = async (): Promise<void> => {
  const existing = await database.get<Category>('categories').query().fetchCount();
  if (existing > 0) return;

  await database.write(async () => {
    const coll = database.get<Category>('categories');
    for (const cat of DEFAULT_CATEGORIES) {
      await coll.create((record) => {
        record.name = cat.name;
        record.icon = cat.icon;
        record.type = cat.type;
      });
    }
  });
};
