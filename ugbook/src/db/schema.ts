import { appSchema, tableSchema } from '@nozbe/watermelondb';

export const schema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'transactions',
      columns: [
        { name: 'type', type: 'string' },
        { name: 'amount', type: 'number' },
        { name: 'category_id', type: 'string', isIndexed: true },
        { name: 'photo_uri', type: 'string', isOptional: true },
        { name: 'voice_note_uri', type: 'string', isOptional: true },
        { name: 'note', type: 'string', isOptional: true },
        { name: 'timestamp', type: 'number', isIndexed: true },
        { name: 'tax_year', type: 'string', isIndexed: true },
      ],
    }),
    tableSchema({
      name: 'categories',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'icon', type: 'string' },
        { name: 'type', type: 'string' },
      ],
    }),
    tableSchema({
      name: 'debts',
      columns: [
        { name: 'direction', type: 'string', isIndexed: true },
        { name: 'contact_name', type: 'string' },
        { name: 'phone', type: 'string', isOptional: true },
        { name: 'photo_uri', type: 'string', isOptional: true },
        { name: 'amount', type: 'number' },
        { name: 'due_date', type: 'number', isOptional: true },
        { name: 'settled', type: 'boolean' },
        { name: 'timestamp', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'sync_log',
      columns: [
        { name: 'entity_type', type: 'string' },
        { name: 'entity_id', type: 'string', isIndexed: true },
        { name: 'status', type: 'string' },
        { name: 'details', type: 'string', isOptional: true },
        { name: 'timestamp', type: 'number' },
      ],
    }),
  ],
});
