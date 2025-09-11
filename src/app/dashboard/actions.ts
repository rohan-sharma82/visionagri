
'use server';

// As authentication has been removed, user-specific data cannot be fetched.
// These functions are kept to avoid breaking the frontend imports, but they return empty data.

import type { Message } from '@/app/ai-farmer/page';

export type YieldPredictionHistory = {
    id: string;
    cropType: string;
    predictedYield: string;
    actualYield: string | null;
    createdAt: Date;
}

export async function getYieldPredictionHistory(): Promise<YieldPredictionHistory[]> {
    // Returns an empty array as there is no user history to fetch.
    return [];
}

export async function getRecentChatHistory(): Promise<Message[]> {
    // Returns an empty array as there is no user history to fetch.
    return [];
}

export async function updateActualYield(id: string, actualYield: string): Promise<void> {
    // Does nothing.
    throw new Error("This feature is disabled as authentication has been removed.");
}
