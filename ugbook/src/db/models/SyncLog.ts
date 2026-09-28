import { Model } from '@nozbe/watermelondb';
import { field, text, readonly, date } from '@nozbe/watermelondb/decorators';

export default class SyncLog extends Model {
  static table = 'sync_log';

  static associations = {};

  @text('entity_type') entityType!: string;
  @text('entity_id') entityId!: string;
  @field('status') status!: 'synced' | 'pending' | 'conflict';
  @text('details') details!: string | null;
  @date('timestamp') timestamp!: Date;
}
