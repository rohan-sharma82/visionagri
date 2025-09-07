
import { pgTable, text, timestamp, uuid, jsonb } from 'drizzle-orm/pg-core';

export const profiles = pgTable('profiles', {
  id: uuid('id').primaryKey(),
  email: text('email').unique(),
  full_name: text('full_name'),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
});


export const chats = pgTable('chats', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').notNull().references(() => profiles.id, { onDelete: 'cascade' }),
    history: jsonb('history').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});


export const yieldPredictions = pgTable('yield_predictions', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').notNull().references(() => profiles.id, { onDelete: 'cascade' }),
    cropType: text('crop_type').notNull(),
    predictedYield: text('predicted_yield').notNull(),
    confidenceLevel: text('confidence_level'),
    yieldAnalysis: text('yield_analysis'),
    actualYield: text('actual_yield'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});
