import { config } from 'dotenv';
config();

import '@/ai/flows/crop-yield-prediction.ts';
import '@/ai/flows/ai-farmer-assistant.ts';
import '@/ai/flows/crop-disease-classification.ts';
import '@/ai/flows/animal-classification.ts';
import '@/ai/flows/text-to-speech.ts';
import '@/ai/flows/dashboard-weather.ts';
import '@/ai/flows/market-price-analysis.ts';
import '@/ai/tools/weather.ts';
import '@/ai/tools/market-price.ts';
