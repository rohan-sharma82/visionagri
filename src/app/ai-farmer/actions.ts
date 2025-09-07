
'use server';

import { db } from '@/lib/db';
import { chats } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { Message } from './page';

async function getUserId() {
    const cookieStore = cookies();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            get(name: string) {
              return cookieStore.get(name)?.value
            },
          },
        }
    );
    const { data: { user } } = await supabase.auth.getUser();
    return user?.id;
}


export async function getChatHistory(): Promise<Message[]> {
    const userId = await getUserId();
    if (!userId) return [];

    try {
        const userChats = await db.select()
            .from(chats)
            .where(eq(chats.userId, userId))
            .limit(1);

        if (userChats.length > 0) {
            const history = userChats[0].history as any;
            return Array.isArray(history) ? history : [];
        }
        return [];
    } catch (error) {
        console.error('Error getting chat history:', error);
        return [];
    }
}

export async function saveChatHistory(history: Message[]): Promise<void> {
    const userId = await getUserId();
    if (!userId) return;

    try {
        const historyJson = JSON.stringify(history);

        // Check if history size exceeds a reasonable limit (e.g., 1MB)
        if (historyJson.length > 1024 * 1024) {
            console.error('Chat history size exceeds limit for user:', userId);
            throw new Error('Chat history is too large to save.');
        }

        await db.insert(chats)
            .values({ userId, history })
            .onConflictDoUpdate({
                target: chats.userId,
                set: { history: history }
            });

    } catch (error) {
        console.error('Error saving chat history:', error);
        throw error;
    }
}

export async function clearChatHistory(): Promise<void> {
     const userId = await getUserId();
    if (!userId) return;
    try {
        await db.delete(chats).where(eq(chats.userId, userId));
    } catch (error) {
        console.error('Error clearing chat history:', error);
        throw error;
    }
}
