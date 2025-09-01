'use server';

/**
 * @fileOverview Crop yield prediction AI agent.
 *
 * - predictCropYield - A function that handles the crop yield prediction process.
 * - PredictCropYieldInput - The input type for the predictCropYield function.
 * - PredictCropYieldOutput - The return type for the predictCropYield function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { getWeatherForLocation } from '@/ai/tools/weather';

const PredictCropYieldInputSchema = z.object({
  cropType: z.string().describe('The type of crop being grown.'),
  soilType: z.string().describe('The type of soil in the field (e.g., Loamy, Sandy, Clay).'),
  location: z.string().describe('The city or state for which to predict the crop yield. e.g. "Delhi, India"'),
  fertilizerUse: z.string().describe('The amount and type of fertilizer used, e.g., "NPK 120-60-60 kg/hectare".'),
  irrigationMethod: z.string().describe('The irrigation method used (e.g., Drip, Sprinkler, Canal).'),
});
export type PredictCropYieldInput = z.infer<typeof PredictCropYieldInputSchema>;

const PredictCropYieldOutputSchema = z.object({
  predictedYield: z
    .string()
    .describe('The predicted crop yield in tonnes per hectare.'),
  confidenceLevel: z
    .string()
    .describe('The confidence level of the prediction as a percentage.'),
  yieldAnalysis: z
    .string()
    .describe('A detailed, conversational analysis for the farmer. It should explain the prediction in simple terms, comparing current weather data to typical averages and explaining what factors are good or bad for the crop this season.'),
  factorsInfluencingYield: z
    .array(z.string())
    .describe('A list of key factors that are influencing the predicted yield.'),
  suggestedActions: z
    .array(z.string())
    .describe('A list of suggested actions to improve the yield.'),
});
export type PredictCropYieldOutput = z.infer<typeof PredictCropYieldOutputSchema>;

export async function predictCropYield(input: PredictCropYieldInput): Promise<PredictCropYieldOutput> {
  return predictCropYieldFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictCropYieldPrompt',
  input: {schema: z.object({
    cropType: z.string(),
    soilType: z.string(),
    fertilizerUse: z.string(),
    temperature: z.string(),
    rainfall: z.string(),
    irrigationMethod: z.string(),
  })},
  output: {schema: PredictCropYieldOutputSchema},
  prompt: `You are an expert in agricultural science, specializing in crop yield prediction for Indian farmers. Your language should be simple, encouraging, and easy to understand.

  Based on the data provided, predict the crop yield in **tonnes per hectare**.

  Then, provide a detailed 'yieldAnalysis' in a conversational tone. Explain what the numbers mean for the farmer. For example, if the current rainfall is higher than average, explain why this is good and that they may not need to worry about watering as much. If the temperature is high, explain the potential impact. Be like a helpful friend giving advice.

  Finally, list the key factors influencing the yield and suggest actionable steps for improvement.

  Data:
  - Crop Type: {{{cropType}}}
  - Soil Type: {{{soilType}}}
  - Current Rainfall: {{{rainfall}}}
  - Current Temperature: {{{temperature}}}
  - Fertilizer Use: {{{fertilizerUse}}}
  - Irrigation Method: {{{irrigationMethod}}}
`,
  tools: [getWeatherForLocation],
});

const predictCropYieldFlow = ai.defineFlow(
  {
    name: 'predictCropYieldFlow',
    inputSchema: PredictCropYieldInputSchema,
    outputSchema: PredictCropYieldOutputSchema,
  },
  async (input) => {
    const weather = await getWeatherForLocation(input.location);
    const {output} = await prompt({
      ...input,
      temperature: `${weather.temp_c}°C`,
      rainfall: `${weather.precip_mm} mm (current)`,
    });
    return output!;
  }
);
