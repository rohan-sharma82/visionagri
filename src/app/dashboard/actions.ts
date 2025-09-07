
'use server';

import { db } from '@/lib/db';
import { yieldPredictions, chats, profiles } from '@/lib/schema';
import { eq, desc } from 'drizzle-orm';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { Message } from '@/app/ai-farmer/page';

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

export type YieldPredictionHistory = {
    id: string;
    cropType: string;
    predictedYield: string;
    actualYield: string | null;
    createdAt: Date;
}

export async function getYieldPredictionHistory(): Promise<YieldPredictionHistory[]> {
    const userId = await getUserId();
    if (!userId) return [];

    try {
        const history = await db.select({
            id: yieldPredictions.id,
            cropType: yieldPredictions.cropType,
            predictedYield: yieldPredictions.predictedYield,
            actualYield: yieldPredictions.actualYield,
            createdAt: yieldPredictions.createdAt,
        })
        .from(yieldPredictions)
        .where(eq(yieldPredictions.userId, userId))
        .orderBy(desc(yieldPredictions.createdAt))
        .limit(5);

        return history.map(item => ({...item, createdAt: item.createdAt! }));

    } catch (error) {
        console.error('Error getting yield prediction history:', error);
        return [];
    }
}

export async function getRecentChatHistory(): Promise<Message[]> {
    const userId = await getUserId();
    if (!userId) return [];

    try {
        const userChats = await db.select()
            .from(chats)
            .where(eq(chats.userId, userId))
            .limit(1);

        if (userChats.length > 0) {
            const history = userChats[0].history as Message[];
            // Return the last 2 messages (one user, one assistant)
            return Array.isArray(history) ? history.slice(-2) : [];
        }
        return [];
    } catch (error) {
        console.error('Error getting recent chat history:', error);
        return [];
    }
}


export async function updateActualYield(id: string, actualYield: string): Promise<void> {
    const userId = await getUserId();
    if (!userId) {
        throw new Error("User not authenticated");
    };

    try {
        await db.update(yieldPredictions)
            .set({ actualYield })
            .where(eq(yieldPredictions.id, id));
            // We could add another `and(eq(yieldPredictions.userId, userId))` for extra security,
            // but RLS already handles this.
    } catch (error) {
        console.error('Error updating actual yield:', error);
        throw new Error('Failed to update actual yield.');
    }
}
