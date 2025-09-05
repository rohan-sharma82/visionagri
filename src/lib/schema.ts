
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const profiles = pgTable('profiles', {
  id: uuid('id').primaryKey(),
  email: text('email').unique(),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
});
