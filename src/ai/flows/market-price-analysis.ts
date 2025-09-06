
'use server';

/**
 * @fileOverview A Genkit flow to fetch and analyze market price data.
 *
 * - getMarketPriceAnalysis - Fetches historical data and provides an AI-driven analysis.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { 
    getMarketPriceHistory,
    MarketPriceHistoryInput,
    MarketPriceAnalysisOutput,
    MarketPriceAnalysisOutputSchema,
    MarketPriceHistoryInputSchema,
} from '@/ai/tools/market-price';


export async function getMarketPriceAnalysis(input: MarketPriceHistoryInput): Promise<MarketPriceAnalysisOutput | null> {
  return getMarketPriceAnalysisFlow(input);
}

const prompt = ai.definePrompt({
    name: 'marketPriceAnalysisPrompt',
    input: { schema: z.object({ crop: z.string(), history: z.array(z.object({ date: z.string(), price: z.number() })) }) },
    output: { schema: MarketPriceAnalysisOutputSchema },
    prompt: `You are an expert agricultural market analyst. Analyze the following 30-day price history for {{{crop}}}.

Data:
{{#each history}}
- {{date}}: {{price}}
{{/each}}

Based on the data, provide a concise, one-sentence "trend" analysis (e.g., "Prices are trending slightly upwards.", "Prices have been volatile but are currently stable.", "Prices are on a downward trend.").

Then, provide a short, two to three-sentence "forecast" for a farmer. This should be simple, actionable advice. For example: "The market shows steady growth. Holding for another week might fetch a better price, but the risk of a downturn is low." or "Prices are dropping. It would be wise to sell now to avoid further losses."

Finally, provide the raw historical data back in the response.`,
});


const getMarketPriceAnalysisFlow = ai.defineFlow(
  {
    name: 'getMarketPriceAnalysisFlow',
    inputSchema: MarketPriceHistoryInputSchema,
    outputSchema: MarketPriceAnalysisOutputSchema.nullable(),
  },
  async ({ crop }) => {
    try {
        const history = await getMarketPriceHistory({ crop });
        if (!history) throw new Error("Failed to fetch market history.");
        
        const { output } = await prompt({ crop, history });
        if (!output) throw new Error("Failed to get AI analysis.");

        return {
            ...output,
            history: history,
        };
    } catch(error) {
        console.error("Error in getMarketPriceAnalysisFlow:", error);
        return null; // Return null on error
    }
  }
);
