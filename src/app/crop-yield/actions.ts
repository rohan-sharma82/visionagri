
'use server';

// As authentication has been removed, yield predictions are no longer saved.
// These functions are kept to avoid breaking frontend imports, but they do nothing.

import type { PredictCropYieldOutput } from '@/ai/flows/crop-yield-prediction';

interface SavePredictionPayload extends PredictCropYieldOutput {
    cropType: string;
}

export async function saveYieldPrediction(payload: SavePredictionPayload): Promise<void> {
    // Does nothing. Yield predictions are not persisted for guest users.
    return;
}
