// This file uses server-side code.
'use server';

/**
 * @fileOverview Classifies the species of animals in an image.
 *
 * - animalClassification - A function that handles the animal classification process.
 * - AnimalClassificationInput - The input type for the animalClassification function.
 * - AnimalClassificationOutput - The return type for the animalClassification function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnimalClassificationInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of an animal, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AnimalClassificationInput = z.infer<typeof AnimalClassificationInputSchema>;

const AnimalClassificationOutputSchema = z.object({
  animalSpecies: z.string().describe('The identified species of the animal.'),
  confidence: z
    .number()
    .describe('The confidence level of the animal species identification.'),
  description: z.string().describe('A short description of the animal, including if it is found in India and its typical habitat or region.'),
});
export type AnimalClassificationOutput = z.infer<typeof AnimalClassificationOutputSchema>;

export async function animalClassification(
  input: AnimalClassificationInput
): Promise<AnimalClassificationOutput> {
  return animalClassificationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'animalClassificationPrompt',
  input: {schema: AnimalClassificationInputSchema},
  output: {schema: AnimalClassificationOutputSchema},
  prompt: `You are an expert in animal species identification. Analyze the provided image and identify the species of the animal.

  Photo: {{media url=photoDataUri}}
  
  Return the animal species and a confidence level (between 0 and 1) for your identification. Also, provide a short description, including if the animal is typically found in India and in which regions or habitats.
`,
});

const animalClassificationFlow = ai.defineFlow(
  {
    name: 'animalClassificationFlow',
    inputSchema: AnimalClassificationInputSchema,
    outputSchema: AnimalClassificationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
