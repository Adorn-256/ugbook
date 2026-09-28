import { Model } from '@nozbe/watermelondb';
import { field, text, readonly, date } from '@nozbe/watermelondb/decorators';

export default class Debt extends Model {
  static table = 'debts';

  static associations = {};

  @field('direction') direction!: 'owed_to_me' | 'i_owe';
  @text('contact_name') contactName!: string;
  @text('phone') phone!: string | null;
  @text('photo_uri') photoUri!: string | null;
  @field('amount') amount!: number;
  @date('due_date') dueDate!: Date | null;
  @field('settled') settled!: boolean;
  @date('timestamp') timestamp!: Date;
}
