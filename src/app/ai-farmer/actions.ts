
'use server';

import { db } from '@/lib/db';
import { sql } from 'drizzle-orm';

interface Chat {
  id: number;
  user_id: string;
  history: any; // Assuming history is a JSON object
}

async function ensureTablesExist() {
    await db.execute(sql`
        CREATE TABLE IF NOT EXISTS chats (
            id SERIAL PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL UNIQUE,
            history JSONB NOT NULL
        );
    `);
}


export async function getChatHistory(userId: string): Promise<any[]> {
    await ensureTablesExist();
    try {
        const result = await db.execute(sql`
            SELECT history FROM chats WHERE user_id = ${userId}
        `);
        if (result.rows.length > 0) {
            const history = result.rows[0].history;
            return Array.isArray(history) ? history : [];
        }
        return [];
    } catch (error) {
        console.error('Error getting chat history:', error);
        return [];
    }
}

export async function saveChatHistory(userId: string, history: any[]): Promise<void> {
    await ensureTablesExist();
    try {
        const historyJson = JSON.stringify(history);

        // Check if history size exceeds a reasonable limit (e.g., 1MB)
        if (historyJson.length > 1024 * 1024) {
            console.error('Chat history size exceeds limit for user:', userId);
            throw new Error('Chat history is too large to save.');
        }

        await db.execute(sql`
            INSERT INTO chats (user_id, history)
            VALUES (${userId}, ${historyJson})
            ON CONFLICT (user_id) DO UPDATE
            SET history = EXCLUDED.history;
        `);
    } catch (error) {
        console.error('Error saving chat history:', error);
        // Rethrow to be caught by the calling function
        throw error;
    }
}

export async function clearChatHistory(userId: string): Promise<void> {
    await ensureTablesExist();
    try {
        await db.execute(sql`
            DELETE FROM chats WHERE user_id = ${userId}
        `);
    } catch (error) {
        console.error('Error clearing chat history:', error);
    }
}
