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
    .describe('The predicted crop yield in bushels per acre or a similar standard unit.'),
  confidenceLevel: z
    .string()
    .describe('The confidence level of the prediction as a percentage.'),
  factorsInfluencingYield: z
    .string()
    .describe('A list of factors that are influencing the predicted yield based on the provided data.'),
  suggestedActions: z
    .string()
    .describe('Suggested actions to improve the yield, such as adjusting fertilizer levels or irrigation.'),
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
  prompt: `You are an expert in agricultural science, specializing in crop yield prediction.

  Based on the data provided, predict the crop yield.

  Consider the following factors when making your prediction:
  - Soil Type
  - Rainfall
  - Temperature
  - Fertilizer Use
  - Irrigation Method (This is a crucial factor, especially for water-intensive crops. A good irrigation system can compensate for low rainfall).

  Crop Type: {{{cropType}}}
  Soil Type: {{{soilType}}}
  Annual Rainfall (mm): {{{rainfall}}}
  Average Temperature (°C): {{{temperature}}}
  Fertilizer Use: {{{fertilizerUse}}}
  Irrigation Method: {{{irrigationMethod}}}

  Provide the predicted yield, the confidence level of the prediction, a list of factors influencing the yield, and suggested actions to improve the yield.
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
