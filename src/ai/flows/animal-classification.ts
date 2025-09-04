
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
  breedInfo: z.object({
    localNames: z.string().optional().describe('Common local names for the breed (e.g., "Lambi Bar, Montgomery, Lola" for Sahiwal).'),
    origin: z.string().optional().describe('The region of origin for the breed.'),
    color: z.string().optional().describe('Typical colors of the breed.'),
    weight: z.string().optional().describe('Average weight for males and females (e.g., "Male - 530 kg, Female - 325 kg").'),
    milkYield: z.string().optional().describe('Average milk yield per day or per lactation.'),
    suitability: z.string().optional().describe('Primary use of the breed (e.g., Milk, Draught, Dual-purpose).')
  }).optional().describe('Detailed information about the specific breed if it is a known domestic cattle breed. Omit if not applicable.'),
  actionableSuggestion: z.string().describe("An actionable suggestion for the farmer based on the animal's species and apparent health from the image. For example, if it's a healthy Gir cow, suggest: 'This breed is known for high milk yield; ensure balanced fodder.' If it appears unhealthy, suggest seeking veterinary advice for specific symptoms."),
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
  prompt: `You are an expert in animal species identification, with a specialization in Indian cattle breeds. Analyze the provided image.

Photo: {{media url=photoDataUri}}

1.  **Identify the species** of the animal and provide a confidence level (between 0 and 1).
2.  Provide a **short description**, including if the animal is typically found in India and in which regions or habitats.
3.  **If the animal is a recognized domestic cattle breed** (like Gir, Sahiwal, etc.), provide the detailed **breedInfo**:
    *   Local Names
    *   Origin
    *   Color
    *   Weight
    *   Milk Yield
    *   Suitability (e.g., Milk, Draught, Dual-purpose)
    *   If the animal is not a specific domestic breed, omit the breedInfo field.
4.  Provide a concise, **actionableSuggestion** for a farmer. This suggestion should be based on the breed's characteristics and its apparent health from the photo. For example: "This breed is known for high milk yield; ensure balanced fodder."
`,
});

const animalClassificationFlow = ai.defineFlow(
  {
    name: 'animalClassificationFlow',
    inputSchema: AnimalClassificationInputSchema,
    outputSchema: AnimalClassificationOutputSchema,
  },
  async input => {
    try {
        const {output} = await prompt(input);
        return output!;
    } catch (error) {
        console.error("Error in animalClassificationFlow:", error);
        // Return a fallback response in case of an API error (like 503)
        return {
            animalSpecies: "Service Unavailable",
            confidence: 0,
            description: "The AI classification service is temporarily overloaded. This can happen when the service is very busy. Please try again in a few moments.",
            actionableSuggestion: "Please try submitting your request again. If the problem persists, consider trying at a later time."
        };
    }
  }
);
