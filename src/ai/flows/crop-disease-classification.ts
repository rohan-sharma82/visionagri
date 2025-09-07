'use server';

/**
 * @fileOverview Crop disease classification AI agent.
 *
 * - classifyCropDisease - A function that handles the crop disease classification process.
 * - ClassifyCropDiseaseInput - The input type for the classifyCropDisease function.
 * - ClassifyCropDiseaseOutput - The return type for the classifyCropDisease function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ClassifyCropDiseaseInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a crop, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ClassifyCropDiseaseInput = z.infer<typeof ClassifyCropDiseaseInputSchema>;

const ClassifyCropDiseaseOutputSchema = z.object({
  disease: z.string().describe('The identified disease of the crop, or "healthy" if no disease is detected.'),
  confidence: z.number().describe('The confidence level of the disease classification, between 0 and 1.'),
  description: z.string().optional().describe('A brief description of the identified disease.'),
  recommendations: z.array(z.string()).optional().describe('A list of actionable recommendations or treatment suggestions for the identified disease.'),
});
export type ClassifyCropDiseaseOutput = z.infer<typeof ClassifyCropDiseaseOutputSchema>;

export async function classifyCropDisease(input: ClassifyCropDiseaseInput): Promise<ClassifyCropDiseaseOutput> {
  return classifyCropDiseaseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'classifyCropDiseasePrompt',
  input: {schema: ClassifyCropDiseaseInputSchema},
  output: {schema: ClassifyCropDiseaseOutputSchema},
  prompt: `You are an expert in identifying crop diseases from images. Analyze the provided image and perform the following tasks:
1.  Identify the disease present. If no disease is detected, respond with "healthy" for the 'disease' field.
2.  Provide a confidence level between 0 and 1 for your classification.
3.  Write a brief 'description' of the disease.
4.  Provide a list of actionable 'recommendations' for treatment or prevention. Format this as an array of strings.

Image: {{media url=photoDataUri}}
`,
});

const classifyCropDiseaseFlow = ai.defineFlow(
  {
    name: 'classifyCropDiseaseFlow',
    inputSchema: ClassifyCropDiseaseInputSchema,
    outputSchema: ClassifyCropDiseaseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
