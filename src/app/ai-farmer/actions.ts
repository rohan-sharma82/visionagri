
'use server';

// As authentication has been removed, chat history is no longer saved to a database.
// These functions are kept to avoid breaking the frontend imports, but they do nothing.

import type { Message } from './page';

export async function getChatHistory(): Promise<Message[]> {
    // Returns an empty array as there's no logged-in user to fetch history for.
    return [];
}

export async function saveChatHistory(history: Message[]): Promise<void> {
    // Does nothing. Chat history is not persisted for guest users.
    return;
}

export async function clearChatHistory(): Promise<void> {
    // Does nothing.
    return;
}
