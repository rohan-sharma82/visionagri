'use server';

/**
 * @fileOverview An AI assistant for providing farming advice.
 *
 * - getFarmingAdvice - A function that takes a question and returns farming advice.
 * - GetFarmingAdviceInput - The input type for the getFarmingAdvice function.
 * - GetFarmingAdviceOutput - The return type for the getFarmingAdvice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetFarmingAdviceInputSchema = z.object({
  query: z.string().describe('The question or request for farming advice.'),
});
export type GetFarmingAdviceInput = z.infer<typeof GetFarmingAdviceInputSchema>;

const GetFarmingAdviceOutputSchema = z.object({
  advice: z.string().describe('The farming advice provided by the AI assistant.'),
});
export type GetFarmingAdviceOutput = z.infer<typeof GetFarmingAdviceOutputSchema>;

export async function getFarmingAdvice(input: GetFarmingAdviceInput): Promise<GetFarmingAdviceOutput> {
  return getFarmingAdviceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getFarmingAdvicePrompt',
  input: {schema: GetFarmingAdviceInputSchema},
  output: {schema: GetFarmingAdviceOutputSchema},
  prompt: `You are an experienced AI farming assistant. A farmer has asked the following question:

{{{query}}}

Provide helpful and practical advice to the farmer. Focus on providing specific, actionable steps the farmer can take to improve their farming practices. Return the advice in a concise and easy-to-understand manner.`,
});

const getFarmingAdviceFlow = ai.defineFlow(
  {
    name: 'getFarmingAdviceFlow',
    inputSchema: GetFarmingAdviceInputSchema,
    outputSchema: GetFarmingAdviceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
