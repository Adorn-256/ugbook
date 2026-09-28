import { Model } from '@nozbe/watermelondb';
import { field, text } from '@nozbe/watermelondb/decorators';

export default class Category extends Model {
  static table = 'categories';

  static associations = {};

  @text('name') name!: string;
  @text('icon') icon!: string;
  @field('type') type!: 'in' | 'out' | 'both';
}
