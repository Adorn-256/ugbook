import { Model, Q } from '@nozbe/watermelondb';
import { field, text, relation, readonly, date } from '@nozbe/watermelondb/decorators';

export default class Transaction extends Model {
  static table = 'transactions';

  static associations = {
    categories: { type: 'belongs_to' as const, key: 'category_id' },
  };

  @field('type') type!: 'in' | 'out';
  @field('amount') amount!: number;
  @relation('categories', 'category_id') category!: any;
  @text('photo_uri') photoUri!: string | null;
  @text('voice_note_uri') voiceNoteUri!: string | null;
  @text('note') note!: string | null;
  @date('timestamp') timestamp!: Date;
  @text('tax_year') taxYear!: string;
}
