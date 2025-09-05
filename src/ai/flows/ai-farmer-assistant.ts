
'use server';

/**
 * @fileOverview An AI assistant for providing farming advice.
 *
 * - getFarmingAdvice - A function that takes a question and returns farming advice.
 * - GetFarmingAdviceInput - The input type for the getFarmingAdvice function.
 * - GetFarmingAdviceOutput - The return type for the getFarmingAdvice function.
 */

import {ai} from '@/ai/genkit';
import {getWeatherForLocation} from '@/ai/tools/weather';
import {z} from 'genkit';

const GetFarmingAdviceInputSchema = z.object({
  query: z.string().describe('The question or request for farming advice.'),
  location: z.string().optional().describe('The user\'s location, e.g., "Delhi, India".'),
});
export type GetFarmingAdviceInput = z.infer<typeof GetFarmingAdviceInputSchema>;

const GetFarmingAdviceOutputSchema = z.object({
  advice: z
    .string()
    .describe('The farming advice provided by the AI assistant.'),
});
export type GetFarmingAdviceOutput = z.infer<
  typeof GetFarmingAdviceOutputSchema
>;

export async function getFarmingAdvice(
  input: GetFarmingAdviceInput
): Promise<GetFarmingAdviceOutput> {
  return getFarmingAdviceFlow(input);
}

const getFarmingAdviceFlow = ai.defineFlow(
  {
    name: 'getFarmingAdviceFlow',
    inputSchema: GetFarmingAdviceInputSchema,
    outputSchema: GetFarmingAdviceOutputSchema,
  },
  async (input) => {
    const prompt = ai.definePrompt({
      name: 'getFarmingAdvicePrompt',
      prompt: `You are an experienced AI farming assistant. A farmer has asked the following question:

{{{query}}}

{{#if location}}
The user is located in {{{location}}}. Use the getWeatherForLocation tool to get the current weather and factor it into your advice. For example, if it's raining, you might advise against certain activities.
{{/if}}

Provide helpful and practical advice to the farmer. Focus on providing specific, actionable steps the farmer can take to improve their farming practices. Return the advice in a concise and easy-to-understand manner.`,
      tools: input.location ? [getWeatherForLocation] : [],
      model: 'googleai/gemini-2.5-flash', // Ensure a specific model is used if needed
    });
    
    // The context for the tool needs to be the location string itself.
    const toolContext = input.location ? {tools: [{tool: getWeatherForLocation, input: input.location}]} : {};

    const {output} = await prompt(input, toolContext);
    return output!;
  }
);
