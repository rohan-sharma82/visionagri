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

const PredictCropYieldInputSchema = z.object({
  cropType: z.string().describe('The type of crop being grown.'),
  soilType: z.string().describe('The type of soil in the field (e.g., Loamy, Sandy, Clay).'),
  rainfall: z.string().describe('The annual rainfall in millimeters.'),
  temperature: z.string().describe('The average temperature in Celsius.'),
  fertilizerUse: z.string().describe('The amount and type of fertilizer used, e.g., "NPK 120-60-60 kg/hectare".'),
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
  input: {schema: PredictCropYieldInputSchema},
  output: {schema: PredictCropYieldOutputSchema},
  prompt: `You are an expert in agricultural science, specializing in crop yield prediction.

  Based on the data provided, predict the crop yield.

  Consider the following factors when making your prediction:
  - Soil Type
  - Rainfall
  - Temperature
  - Fertilizer Use

  Crop Type: {{{cropType}}}
  Soil Type: {{{soilType}}}
  Annual Rainfall (mm): {{{rainfall}}}
  Average Temperature (°C): {{{temperature}}}
  Fertilizer Use: {{{fertilizerUse}}}

  Provide the predicted yield, the confidence level of the prediction, a list of factors influencing the yield, and suggested actions to improve the yield.
`,
});

const predictCropYieldFlow = ai.defineFlow(
  {
    name: 'predictCropYieldFlow',
    inputSchema: PredictCropYieldInputSchema,
    outputSchema: PredictCropYieldOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
