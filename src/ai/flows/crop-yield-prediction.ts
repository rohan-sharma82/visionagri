
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
  temperature: z.string().describe('The current average temperature in Celsius.'),
  rainfall: z.string().describe('The recent rainfall in mm.'),
  farmSize: z.string().describe('The size of the farm (e.g., "2 hectares", "5 acres").'),
  fertilizerType: z.string().optional().describe('The type of fertilizer used (e.g., Urea, DAP, NPK).'),
  fertilizerAmount: z.string().optional().describe('The amount of fertilizer used, e.g., "50 kg/acre".'),
  irrigationMethod: z.string().optional().describe('The irrigation method used (e.g., Drip, Sprinkler, Canal).'),
  additionalNotes: z.string().optional().describe('Any additional notes from the farmer, such as use of other sprays, observed pest issues, or mixed cropping details.'),
});
export type PredictCropYieldInput = z.infer<typeof PredictCropYieldInputSchema>;

const PredictCropYieldOutputSchema = z.object({
  predictedYield: z
    .string()
    .describe('The predicted crop yield per unit of land, in a suitable unit (e.g., "12 quintals/acre", "5 tonnes/hectare"). Do not provide the total yield for the entire farm.'),
  confidenceLevel: z
    .string()
    .describe('The confidence level of the prediction as a percentage.'),
  yieldAnalysis: z
    .string()
    .describe('A detailed, conversational analysis for the farmer. It should explain the prediction in simple terms, comparing current weather data to typical averages and explaining what factors are good or bad for the crop this season.'),
  fertilizerSuitability: z
    .string()
    .optional()
    .describe('A brief analysis on whether the chosen fertilizer is suitable for the crop, and why. For example: "Urea is a good choice for wheat during its growth stage as it provides essential nitrogen." or "DAP is not ideal for this stage; consider using a potassium-rich fertilizer instead." Omit this field if no fertilizer was specified.'),
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
  input: {schema: PredictCropYieldInputSchema},
  output: {schema: PredictCropYieldOutputSchema},
  prompt: `You are an expert in agricultural science, specializing in crop yield prediction for Indian farmers. Your language should be simple, encouraging, and easy to understand.

  Based on the data provided, predict the crop yield **per unit of land** (e.g., "12 quintals per acre", "5 tonnes per hectare"). Use the unit from the 'farmSize' input. Do NOT provide the total yield for the entire farm.

  Then, provide a detailed 'yieldAnalysis' in a conversational tone. Explain what the numbers mean for the farmer. For example, if the current rainfall is higher than average, explain why this is good.
  
  {{#if fertilizerType}}
  Analyze the suitability of the selected fertilizer ({{fertilizerType}}) for the specified crop ({{cropType}}). Provide this analysis in the 'fertilizerSuitability' field. Be specific, for example: "Urea is a good source of nitrogen, which is excellent for the vegetative growth phase of wheat." or "While DAP is useful, this crop would benefit more from a potassium-rich fertilizer at this stage."
  {{/if}}

  {{#if additionalNotes}}
  The farmer has provided these additional notes: "{{{additionalNotes}}}". You MUST consider this information in your analysis and suggestions. For example, if they mention a weed controller, acknowledge it and factor it into your recommendations.
  {{/if}}

  List the key factors influencing the yield and suggest actionable steps for improvement.
  
  {{#if irrigationMethod}}
  {{else}}
  If the irrigation method is not provided, include a suggestion for the best method in the 'suggestedActions'.
  {{/if}}

  {{#if fertilizerAmount}}
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
  - Fertilizer Type: {{{fertilizerType}}}
  - Fertilizer Amount: {{{fertilizerAmount}}}
  - Irrigation Method: {{{irrigationMethod}}}
  - Additional Notes: {{{additionalNotes}}}
`,
});

const predictCropYieldFlow = ai.defineFlow(
  {
    name: 'predictCropYieldFlow',
    inputSchema: PredictCropYieldInputSchema,
    outputSchema: PredictCropYieldOutputSchema,
  },
  async (input) => {
    try {
        const {output} = await prompt(input);
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
