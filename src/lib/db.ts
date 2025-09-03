import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

if (!process.env.SUPABASE_DATABASE_URL) {
  throw new Error('SUPABASE_DATABASE_URL is not set');
}

const connectionString = process.env.SUPABASE_DATABASE_URL;
const client = postgres(connectionString);
export const db = drizzle(client);
