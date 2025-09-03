
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
  farmSize: z.string().describe('The size of the farm (e.g., "2 hectares", "5 acres").'),
  fertilizerUse: z.string().optional().describe('The amount and type of fertilizer used, e.g., "NPK 120-60-60 kg/hectare".'),
  irrigationMethod: z.string().optional().describe('The irrigation method used (e.g., Drip, Sprinkler, Canal).'),
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
  idealValues: z.object({
    fertilizer: z.string().describe("Suggested fertilizer application based on farm size and crop type."),
    irrigation: z.string().describe("Suggested irrigation method based on farm size and crop type."),
  }).describe("Ideal input suggestions for the given farm size."),
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
    fertilizerUse: z.string().optional(),
    temperature: z.string(),
    rainfall: z.string(),
    irrigationMethod: z.string().optional(),
    farmSize: z.string(),
  })},
  output: {schema: PredictCropYieldOutputSchema},
  prompt: `You are an expert in agricultural science, specializing in crop yield prediction for Indian farmers. Your language should be simple, encouraging, and easy to understand.

  Based on the data provided, predict the crop yield in **tonnes per hectare**.

  Then, provide a detailed 'yieldAnalysis' in a conversational tone. Explain what the numbers mean for the farmer. For example, if the current rainfall is higher than average, explain why this is good.

  List the key factors influencing the yield and suggest actionable steps for improvement.
  
  {{#if irrigationMethod}}
  {{else}}
  If the irrigation method is not provided, include a suggestion for the best method in the 'suggestedActions'.
  {{/if}}

  {{#if fertilizerUse}}
  {{else}}
  If fertilizer use is not provided, include a suggestion for fertilizer application in the 'suggestedActions'.
  {{/if}}

  Finally, based on the farm size, provide ideal values for fertilizer and irrigation in the 'idealValues' object.

  Data:
  - Crop Type: {{{cropType}}}
  - Soil Type: {{{soilType}}}
  - Farm Size: {{{farmSize}}}
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
    try {
        const weather = await getWeatherForLocation(input.location);
        const {output} = await prompt({
            ...input,
            temperature: `${weather.temp_c}°C`,
            rainfall: `${weather.precip_mm} mm (current)`,
        });
        return output!;
    } catch (error) {
        console.error("Error in predictCropYieldFlow:", error);
        // Return a fallback response in case of an API error (like 503)
        return {
            predictedYield: "N/A",
            confidenceLevel: "0%",
            yieldAnalysis: "The AI prediction service is temporarily unavailable. This can happen when the service is very busy. Please try again in a few moments.",
            factorsInfluencingYield: ["Service availability"],
            suggestedActions: ["Try submitting your request again."],
            idealValues: {
                fertilizer: "N/A",
                irrigation: "N/A",
            },
        };
    }
  }
);

