import { config } from 'dotenv';
config();

import '@/ai/flows/crop-yield-prediction.ts';
import '@/ai/flows/ai-farmer-assistant.ts';
import '@/ai/flows/crop-disease-classification.ts';
import '@/ai/flows/animal-classification.ts';