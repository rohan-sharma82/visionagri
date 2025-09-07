
'use server';

import { db } from '@/lib/db';
import { yieldPredictions } from '@/lib/schema';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { PredictCropYieldOutput } from '@/ai/flows/crop-yield-prediction';

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

interface SavePredictionPayload extends PredictCropYieldOutput {
    cropType: string;
}

export async function saveYieldPrediction(payload: SavePredictionPayload): Promise<void> {
    const userId = await getUserId();
    if (!userId) {
        console.error("User not logged in. Cannot save prediction.");
        return;
    };

    try {
        await db.insert(yieldPredictions).values({
            userId,
            cropType: payload.cropType,
            predictedYield: payload.predictedYield,
            confidenceLevel: payload.confidenceLevel,
            yieldAnalysis: payload.yieldAnalysis,
        });
    } catch (error) {
        console.error('Error saving yield prediction:', error);
        throw new Error('Failed to save prediction to the database.');
    }
}
