'use server';

import { db } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';
import { cookies } from 'next/headers';
import type { Message } from './page';

const USER_ID_COOKIE = 'agrivision_user_id';

export async function createOrGetUserId() {
  const cookieStore = cookies();
  let userId = cookieStore.get(USER_ID_COOKIE)?.value;

  if (!userId) {
    userId = uuidv4();
    cookieStore.set(USER_ID_COOKIE, userId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });
  }

  // Ensure the chats table exists
  await db.sql`
    CREATE TABLE IF NOT EXISTS chats (
      id SERIAL PRIMARY KEY,
      user_id VARCHAR(255) NOT NULL,
      role VARCHAR(50) NOT NULL,
      content TEXT NOT NULL,
      audio_url TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  
  return userId;
}

export async function getMessages(userId: string): Promise<Message[]> {
    try {
        const result = await db.sql`
            SELECT id, role, content, audio_url as "audioUrl"
            FROM chats 
            WHERE user_id = ${userId} 
            ORDER BY created_at ASC
        `;
        return result.rows as Message[];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch messages.');
    }
}

export async function addMessage(userId: string, message: Message) {
    const { role, content, audioUrl } = message;
    try {
        await db.sql`
            INSERT INTO chats (user_id, role, content, audio_url)
            VALUES (${userId}, ${role}, ${content}, ${audioUrl ?? null})
        `;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to add message.');
    }
}

export async function clearMessages(userId: string) {
    try {
        await db.sql`DELETE FROM chats WHERE user_id = ${userId}`;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to clear messages.');
    }
}
